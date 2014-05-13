---
layout: post
title:  "Webapp实践"
date:   2014/05/13 22:26:41
categories: webapp
---

# Webapp实践

## 移动终端性能优化

1. 首屏优先，首屏不可见内容异步载入
2. 代码去冗余
3. 图片压缩
4. 接入CDN，改善单域的资源并发限制。
5. 静态资源缓存控制 + FIS版本管理系统。
6. 图片延迟加载
7. 请求合并
8. 异步请求使用get方式，发送请求快，同时可被缓存

## Base64调研及优劣分析

> Base64是指把二进制数据转换为ASCII字符串形式来表示的编码。Base64会将每3个Byte拆分为四个部分，即每个部分6bit，对应为一个ASCII字符，所以Base64编码后的尺寸会比实际多出1/3。
	理论上说，所有的数据都可以base64编码，但实际上对大量数据进行base64编码的意义不大，所以base64通常用于url传参、小图片序列化等。目前主流的浏览器都支持base64编码(IE8+)。

测试采用webapp使用的106个png图标/小图片作为样本，对比base64和css sprite的优缺点：

1. 所有图标原始体积总和为242KB
2. Base64编码后的CSS文件尺寸为328KB
3. Base64编码后的CSS文件gzip压缩后体积为138KB
4. 将全部Base64编码后的图标解码费时：Thinkpad x230约20ms，Note3约197ms，Lumia 820(双核 1536MHz)约402ms，按一个页面5个图标计，一般手机费时约20ms左右，尚可接受
5. 将所有图标打包成css sprite，体积约为50KB（47.3KB的一张png加gzip后的1.5KB的CSS）

调研结论：

1. css sprite有比base 64更高的压缩比和性能，但对高清屏手机来说，fis的css sprite打包策略还不支持双倍宽高的背景图片，另外目前部分站点也采用单倍宽高的背景图片，可以作为一个备用方案。
2. Base64编码体积较大，复用率差，适合小图标（比如1KB以下）的编码，不适合作为整体的解决方案
3. 另外一个解决方案是Web字体，有体积小，可缩放，缺点是只支持纯色，可以作为一个重点方案来调研。参考链接：http://www.poluoluo.com/jzxy/201206/167011.html

##  ios中将网页添加到主屏幕

将webapp添加到桌面，主要通过几个ios专用的meta和link标签来实现，这些标签在其它系统中将被忽略。下面将主要介绍这些标签：

 1. `<meta name="apple-mobile-web-app-capable" content="yes">` 该标签标志添加到主屏幕的webapp是否运行在全屏模式下。在全屏模式下，ios将隐藏safari工具栏，这样webapp看起来更像是一个native app，可视区域也更大。
 2. `<meta name="apple-mobile-web-app-status-bar-style" content="black">`
	   该标签只在全屏模式下有效，设置全屏模式下ios状态条的显示模式，默认值 `default` 时状态栏将以普通的形态展现，设置为 `black` 时状态栏将显示为黑色背景，如果设置为 `black-translucent`，则webapp将在完全全屏状态下运行
 3. 在root目录下放置apple-touch-icon.png或apple-touch-icon-precomposed.png，网站所有的页面的webapp存到桌面时将使用该图片作为程序图标，其中-precomposed，ios将不会在图标上添加高光效果。如果ios找不到相应的图标文件，将使用页面缩略图作为程序图标，如果之后图标有更新，旧的图标也会更新为新的图片效果。好的图标能让webapp看起来更专业
 4. &lt;link rel=&quot;apple-touch-icon&quot; href=&quot;/custom_icon.png&quot;/&gt;
	   设置当前页面的程序图标，如果之前有设置root目录下的图标，当前页面的设置将覆盖root下的图标效果。同样，我们可以设置&lt;link rel=&quot;apple-touch-icon-precomposed&quot; href=&quot;/custom_icon.png&quot;/&gt;来去除高光效果。
 5. &lt;link rel=&quot;apple-touch-icon&quot; href=&quot;touch-icon-iphone.png&quot; /&gt;
	   &lt;link rel=&quot;apple-touch-icon&quot; sizes=&quot;72x72&quot; href=&quot;touch-icon-ipad.png&quot; /&gt;
	   &lt;link rel=&quot;apple-touch-icon&quot; sizes=&quot;114x114&quot; href=&quot;touch-icon-iphone-retina.png&quot; /&gt;
	   &lt;link rel=&quot;apple-touch-icon&quot; sizes=&quot;144x144&quot; href=&quot;touch-icon-ipad-retina.png&quot; /&gt;
	   可以给不同的设备指定不同的图标, 需要sizes属性来进行区分, 如果没有定义sizes属性, 则使用默认sizes 57x57。如果没有图片尺寸可以匹配设备图标的尺寸, 将使用比设备图标尺寸略大的图片; 如果没有比设备图标大的图片, 则使用最大尺寸的图片。为了呈现更精细的显示效果，通常图片的尺寸为sizes的两倍，比如sizes为72x72的图片touch-icon-ipad.png的实际尺寸为144x144。
 6. &lt;link rel=&quot;apple-touch-startup-image&quot; href=&quot;/startup.png&quot;&gt;
	   该标签将设置一个webapp程序的启动画面，该画面在点击图标后在载入过程中展现。如果没有设置，载入过程中将显示空白背景。
 7. 兼容iphone5+。默认的webapp程序在iphone5下会不能全屏展现，上下会有部分留空。我们可以通过下面代码兼容iphone5：
 
    ```html
<!-- 标准的viewport设置-->
<meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
<!-- 兼容iphone5的设置，上面的width=device-width设置会让iphone留白，在iphone5中需要去掉 -->
<meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1" media="(device-height: 568px)" />
同样我们可以设置iphone5的启动画面：
&lt;link href=&quot;assets/splashs/splash_1096.png&quot; rel=&quot;apple-touch-startup-image&quot; media=&quot;(device-height: 568px)&quot;&gt;
    ```

 8. webapp程序内跳转。通常的webapp应用页面间的跳转都使用a标签，而全屏模式下点击a标签默认都将启动safari来继续加载下一个页面，这使得webapp的实用性大大降低。不过我们可以通过一个技巧来绕过这个设定，将跳转的链接url设置为当前页面的href，ios会直接在webapp内部打开新的页面，这样webapp的程序使用起来和一般的原生程序几乎没有差别。zepto的实现代码如下：

    ```javascript 
	if(navigator.standalone){
		$(document).on(&quot;click&quot;, &quot;a&quot;, function(e){ 
			e.preventDefault(); 
			location.href = $(e.target).attr(&quot;href&quot;); 
		});
	}
    ```

参考资源:

- [Safari Web Content Guide: Configuring Web Applications](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html#//apple_ref/doc/uid/TP40002051-CH3-SW4)
- [iOS Human Interface Guidelines: Custom Icon and Image Creation Guidelines](https://developer.apple.com/library/safari/documentation/UserExperience/Conceptual/MobileHIG/IconsImages/IconsImages.html#//apple_ref/doc/uid/TP40006556-CH14-SW11)

##  Webapp调起Native app

1. IOS 方案，[参考这里](http://www.cnblogs.com/xiaouisme/archive/2012/03/14/2396006.html)
2. Android，需要调起 APP 在后台有个监听程序，监听程序在本地打开一个端口，通过访问这个端口触发这个监听程序去运行指定的功能
3. JS和APP的通信就依靠APP的这个监听程序，如果JS要APP调起后还要它去执行某些操作，就可以通过URL的参数去告知这个APP
4. 总之，要调起Android上的APP，只要在Web端用隐藏的iframe去打开指定的一个URL就行

##  移动终端的默认字体 

三大手机系统的默认字体：

 1. IOS，中文 STHeiti，英文 Helvetica；数字 HelveticaNeue
 2. Android 中文 Droidsansfallback ；英文和数字 Droid Sans
 3. WinPhone 中文 Dengxian，英文和数字 Segoe

