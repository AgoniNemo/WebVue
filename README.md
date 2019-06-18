# webvue

> Porn online video 


# Image
#### 登录
![login](https://raw.githubusercontent.com/AgoniNemo/WebVue/master/image/login.png)

#### 首界面
![home](https://raw.githubusercontent.com/AgoniNemo/WebVue/master/image/home.png)

#### 影片播放
![video](https://raw.githubusercontent.com/AgoniNemo/WebVue/master/image/video.png)
![play](https://raw.githubusercontent.com/AgoniNemo/WebVue/master/image/play.png)

#### 个人信息
![info](https://raw.githubusercontent.com/AgoniNemo/WebVue/master/image/info.png)

#### 影片收藏
![collect](https://raw.githubusercontent.com/AgoniNemo/WebVue/master/image/collect.png)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

####   题外话 如何在本地加载打包的web
```
一、Mac OS X 自带了 Apache 环境

Apache服务器默认的web根目录在：/Library/WebServer/Documents
Apache的配置文件在：/etc/apache2

将index.html文件拷贝到 /Library/WebServer/Documents 目录下
将static文件夹拷贝到 /Library/WebServer/Documents 目录下

在terminal终端直接运行Apache的启动命令来打开：sudo apachectl start

在浏览器 输入地址 规则为：IP/index.html 比如：http://192.168.0.5/index.html
IP为本机的IP

停止 Apache：sudo apachectl stop
重启 Apache：sudo apachectl restart

上面的步骤只能  打开一些静态界面，需要网络请求 会遇到跨域问题
解决方法 如下

二、跨域问题

1.建立本地跨域文件夹
这个文件夹是浏览器打开时候进行设置一些基本文件，因为需要关闭浏览器的安全策略。
命令：cd /Users/[用户名]/Documents/ 然后建立个文件夹：命令是mkdir ChromeDevData

参数：ChromeDevData可以自己命名，只要与下面的命令中的ChromeDevData保持一致就行

2.打开浏览器增加参数
命令：open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/[用户名]/Documents/ChromeDevData

```
