---
layout: post
title:  "Webappʵ��"
date:   2014/05/13 22:26:41
categories: webapp
---

# Webappʵ��

## �ƶ��ն������Ż�

1. �������ȣ��������ɼ������첽����
2. ����ȥ����
3. ͼƬѹ��
4. ����CDN�����Ƶ������Դ�������ơ�
5. ��̬��Դ������� + FIS�汾����ϵͳ��
6. ͼƬ�ӳټ���
7. ����ϲ�
8. �첽����ʹ��get��ʽ����������죬ͬʱ�ɱ�����

## Base64���м����ӷ���

> Base64��ָ�Ѷ���������ת��ΪASCII�ַ�����ʽ����ʾ�ı��롣Base64�Ὣÿ3��Byte���Ϊ�ĸ����֣���ÿ������6bit����ӦΪһ��ASCII�ַ�������Base64�����ĳߴ���ʵ�ʶ��1/3��
	������˵�����е����ݶ�����base64���룬��ʵ���϶Դ������ݽ���base64��������岻������base64ͨ������url���Ρ�СͼƬ���л��ȡ�Ŀǰ�������������֧��base64����(IE8+)��

���Բ���webappʹ�õ�106��pngͼ��/СͼƬ��Ϊ�������Ա�base64��css sprite����ȱ�㣺

1. ����ͼ��ԭʼ����ܺ�Ϊ242KB
2. Base64������CSS�ļ��ߴ�Ϊ328KB
3. Base64������CSS�ļ�gzipѹ�������Ϊ138KB
4. ��ȫ��Base64������ͼ������ʱ��Thinkpad x230Լ20ms��Note3Լ197ms��Lumia 820(˫�� 1536MHz)Լ402ms����һ��ҳ��5��ͼ��ƣ�һ���ֻ���ʱԼ20ms���ң��пɽ���
5. ������ͼ������css sprite�����ԼΪ50KB��47.3KB��һ��png��gzip���1.5KB��CSS��

���н��ۣ�

1. css sprite�б�base 64���ߵ�ѹ���Ⱥ����ܣ����Ը������ֻ���˵��fis��css sprite������Ի���֧��˫����ߵı���ͼƬ������Ŀǰ����վ��Ҳ���õ�����ߵı���ͼƬ��������Ϊһ�����÷�����
2. Base64��������ϴ󣬸����ʲ�ʺ�Сͼ�꣨����1KB���£��ı��룬���ʺ���Ϊ����Ľ������
3. ����һ�����������Web���壬�����С�������ţ�ȱ����ֻ֧�ִ�ɫ��������Ϊһ���ص㷽�������С��ο����ӣ�http://www.poluoluo.com/jzxy/201206/167011.html

##  ios�н���ҳ��ӵ�����Ļ

��webapp��ӵ����棬��Ҫͨ������iosר�õ�meta��link��ǩ��ʵ�֣���Щ��ǩ������ϵͳ�н������ԡ����潫��Ҫ������Щ��ǩ��

 1. `<meta name="apple-mobile-web-app-capable" content="yes">` �ñ�ǩ��־��ӵ�����Ļ��webapp�Ƿ�������ȫ��ģʽ�¡���ȫ��ģʽ�£�ios������safari������������webapp������������һ��native app����������Ҳ����
 2. `<meta name="apple-mobile-web-app-status-bar-style" content="black">`
	   �ñ�ǩֻ��ȫ��ģʽ����Ч������ȫ��ģʽ��ios״̬������ʾģʽ��Ĭ��ֵ `default` ʱ״̬��������ͨ����̬չ�֣�����Ϊ `black` ʱ״̬������ʾΪ��ɫ�������������Ϊ `black-translucent`����webapp������ȫȫ��״̬������
 3. ��rootĿ¼�·���apple-touch-icon.png��apple-touch-icon-precomposed.png����վ���е�ҳ���webapp�浽����ʱ��ʹ�ø�ͼƬ��Ϊ����ͼ�꣬����-precomposed��ios��������ͼ������Ӹ߹�Ч�������ios�Ҳ�����Ӧ��ͼ���ļ�����ʹ��ҳ������ͼ��Ϊ����ͼ�꣬���֮��ͼ���и��£��ɵ�ͼ��Ҳ�����Ϊ�µ�ͼƬЧ�����õ�ͼ������webapp��������רҵ
 4. &lt;link rel=&quot;apple-touch-icon&quot; href=&quot;/custom_icon.png&quot;/&gt;
	   ���õ�ǰҳ��ĳ���ͼ�꣬���֮ǰ������rootĿ¼�µ�ͼ�꣬��ǰҳ������ý�����root�µ�ͼ��Ч����ͬ�������ǿ�������&lt;link rel=&quot;apple-touch-icon-precomposed&quot; href=&quot;/custom_icon.png&quot;/&gt;��ȥ���߹�Ч����
 5. &lt;link rel=&quot;apple-touch-icon&quot; href=&quot;touch-icon-iphone.png&quot; /&gt;
	   &lt;link rel=&quot;apple-touch-icon&quot; sizes=&quot;72x72&quot; href=&quot;touch-icon-ipad.png&quot; /&gt;
	   &lt;link rel=&quot;apple-touch-icon&quot; sizes=&quot;114x114&quot; href=&quot;touch-icon-iphone-retina.png&quot; /&gt;
	   &lt;link rel=&quot;apple-touch-icon&quot; sizes=&quot;144x144&quot; href=&quot;touch-icon-ipad-retina.png&quot; /&gt;
	   ���Ը���ͬ���豸ָ����ͬ��ͼ��, ��Ҫsizes��������������, ���û�ж���sizes����, ��ʹ��Ĭ��sizes 57x57�����û��ͼƬ�ߴ����ƥ���豸ͼ��ĳߴ�, ��ʹ�ñ��豸ͼ��ߴ��Դ��ͼƬ; ���û�б��豸ͼ����ͼƬ, ��ʹ�����ߴ��ͼƬ��Ϊ�˳��ָ���ϸ����ʾЧ����ͨ��ͼƬ�ĳߴ�Ϊsizes������������sizesΪ72x72��ͼƬtouch-icon-ipad.png��ʵ�ʳߴ�Ϊ144x144��
 6. &lt;link rel=&quot;apple-touch-startup-image&quot; href=&quot;/startup.png&quot;&gt;
	   �ñ�ǩ������һ��webapp������������棬�û����ڵ��ͼ��������������չ�֡����û�����ã���������н���ʾ�հױ�����
 7. ����iphone5+��Ĭ�ϵ�webapp������iphone5�»᲻��ȫ��չ�֣����»��в������ա����ǿ���ͨ������������iphone5��
 
    ```html
<!-- ��׼��viewport����-->
<meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
<!-- ����iphone5�����ã������width=device-width���û���iphone���ף���iphone5����Ҫȥ�� -->
<meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1" media="(device-height: 568px)" />
ͬ�����ǿ�������iphone5���������棺
&lt;link href=&quot;assets/splashs/splash_1096.png&quot; rel=&quot;apple-touch-startup-image&quot; media=&quot;(device-height: 568px)&quot;&gt;
    ```

 8. webapp��������ת��ͨ����webappӦ��ҳ������ת��ʹ��a��ǩ����ȫ��ģʽ�µ��a��ǩĬ�϶�������safari������������һ��ҳ�棬��ʹ��webapp��ʵ���Դ�󽵵͡��������ǿ���ͨ��һ���������ƹ�����趨������ת������url����Ϊ��ǰҳ���href��ios��ֱ����webapp�ڲ����µ�ҳ�棬����webapp�ĳ���ʹ��������һ���ԭ�����򼸺�û�в��zepto��ʵ�ִ������£�

    ```javascript 
	if(navigator.standalone){
		$(document).on(&quot;click&quot;, &quot;a&quot;, function(e){ 
			e.preventDefault(); 
			location.href = $(e.target).attr(&quot;href&quot;); 
		});
	}
    ```

�ο���Դ:

- [Safari Web Content Guide: Configuring Web Applications](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html#//apple_ref/doc/uid/TP40002051-CH3-SW4)
- [iOS Human Interface Guidelines: Custom Icon and Image Creation Guidelines](https://developer.apple.com/library/safari/documentation/UserExperience/Conceptual/MobileHIG/IconsImages/IconsImages.html#//apple_ref/doc/uid/TP40006556-CH14-SW11)

##  Webapp����Native app

1. IOS ������[�ο�����](http://www.cnblogs.com/xiaouisme/archive/2012/03/14/2396006.html)
2. Android����Ҫ���� APP �ں�̨�и��������򣬼��������ڱ��ش�һ���˿ڣ�ͨ����������˿ڴ��������������ȥ����ָ���Ĺ���
3. JS��APP��ͨ�ž�����APP����������������JSҪAPP�����Ҫ��ȥִ��ĳЩ�������Ϳ���ͨ��URL�Ĳ���ȥ��֪���APP
4. ��֮��Ҫ����Android�ϵ�APP��ֻҪ��Web�������ص�iframeȥ��ָ����һ��URL����

##  �ƶ��ն˵�Ĭ������ 

�����ֻ�ϵͳ��Ĭ�����壺

 1. IOS������ STHeiti��Ӣ�� Helvetica������ HelveticaNeue
 2. Android ���� Droidsansfallback ��Ӣ�ĺ����� Droid Sans
 3. WinPhone ���� Dengxian��Ӣ�ĺ����� Segoe

