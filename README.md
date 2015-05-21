# 前端自动化部署
## GulpJs + Requirejs + LessCss + md5
> 目前主要针对CSS和JS的合并、压缩、添加md5版本号，其他功能后续添加！


#### 一、项目结构
###### 以 `public/src/demo/module-test/` 做为案例
```
  package.json
  gulpfile.js
  - public
    - src
      rjs-config-s.js
      - demo
        rjs-config.js
        - module-test
            main.html
            main.js
            main.less
    - release

```
>* `package.json` 增加需要用到的模块
>* `gulpfile.js` gulp的配置文件
>* `public` 为所有静态资源的根目录
>* `src` 为开发目录，存放所有源文件，如公用组件: modules，如目录和业务模块：demo
>* `release` 为发布目录，默认为空，结构对应src，使用gulp发布命令后，存放自动生成的文件
>* `public/src/rjs-config-s.js` 为单个模块打包的配置文件，参考[r.js](http://requirejs.org/docs/optimization.html)的配置文件([参数配置](https://github.com/jrburke/r.js/blob/master/build/example.build.js))
>* `public/src/demo/rjs-config.js`  为某个目录打包的配置文件。 每个业务目录需要配置一个rjs-config.js文件



#### 二、Gulp命令发布

###### 1. 发布单个模块
合并压缩public/src/demo/module-test/main.js及其依赖的模块，编译main.less，加上md5版本号， 命令：

```
gulp release -n module-test/main
```

命令解释：

>* `release` 为gulp的task名称， 后面的都是传递的参数。
>* `-paramName paramValue` 这是参数的书写格式， name和value以空格分开，两个参数中间以空格分开
>* `-n` [必填] 要压缩的JS模块名称

选传参数：

>* `-e` [选填] 不需要合并的JS模块，参考r.js参数
如：`-e zepto,mClone` 表示合并JS的时候不合并zepto和mClone模块

>* `-m` [选填] 添加md5版本号
md5后面可以加参数值， `-m 3.0.1` 生成的文件名为数字+md5如： `main-3.0.1-a7a6b03d.js` 。也可以不加参数值，结果为 `main-a7a6b03d.js`

>* `-p` [选填] 项目子目录。默认为demo。
如：`-n module-test/main -p demo`  最终的路径为: public/src/demo/module-test/main

最长的命令：

```
gulp release -n module-test/main -e zepto,mClone -m 1.0.1 -p 2015
```
表示： 合并压缩`public/src/2015/module-test/main.js`除了zepto和mClone的所有模块， 编译main.less， 并加上带`-1.0.1`前缀的版本号


###### 2. 发布一个目录（多个模块）
打包`public/src/demo` 下的所有模块，包括js压缩合并，Less压缩合并，增加md5版本号，命令：

```
gulp release-all
```

选传参数：
>* `-p` 同上
>* `-m` 同上


最长的命令：

```
gulp release-all -m 1.0.1 -p 2015
```
表示： 合并压缩public/src/2015目录下的所有模块， 编译所有less， 并加上带`-1.0.1`前缀的版本号



### 三、requirejs 使用规范
###### 以`public/src/demo/module-test` 模块作为案例
###### 1. html 部分:
`- public/src/module-test/main.html`

```
<script>
var require = {
  baseUrl: '/',
  urlArgs: "v=1.0.1"
};
</script>
<script src="../release/require/require.js" data-main="release/demo/module-test/module-test"></script>
```

>* `@baseUrl` data-mian的引用路径和main.js里的所有模块都使用这个baseUrl
>* `@urlArgs` 版本号，[可选]
>* `@data-main` requirejs标准的加载js方式

###### 2. js 部分:
`- public/src/module-test/main.js`

```
require.config({
  paths: {
    jquery: 'src/jquery/jquery-2.1.4.min',
    zepto: 'src/zepto/zepto.1.1.6.min',
    mDialog:'src/modules/mDialog/mDialog',
    mHistroy:'src/modules/mHistroy/mHistroy',
    mClone:'src/modules/mClone/mClone',
    datePicker: 'src/modules/datePicker/datePicker',
    calendar: 'src/modules/calendar/calendar'
  }
});
require(['zepto', 'mDialog', 'mClone', 'datePicker', 'calendar'], function($){
  $(function(){
    $.alert({
      content:'这是一个提示',
      callback:function(){},
      title:'标题',
      btn:'按钮文本'
    });

    var calendar = require('calendar');
    var cal = new calendar({
      item: $('.calendar'),
      page:2,
      setDefault:{start:new Date(),count:3},
      setContent:{text:'今天', date:new Date()},
      callback:function(result){
        console.log(result)
      }
    });
    cal.init();
  });
});
```

>* `require.config` requirejs的使用配置。 paths为模块的映射，见第四部分详解。
>* `['zepto', 'mDialog', 'mClone', 'datePicker', 'calendar']`  main.js依赖的模块, 见[API](http://www.requirejs.cn/docs/api.html)

###### 3. AMD/UMD模块 部分:

> [AMD](https://github.com/amdjs/amdjs-api) 是requirejs支持的规范， 用require('modulename')的方式调用
> [UMD](https://github.com/umdjs/umd) 是既支持AMD规范，又支持&lt;script src="moduelname.js"&gt;这种方式引用的规范,目前public/src/modules里的模块大都使用UMD规范

main.js依赖了 `['zepto', 'mDialog', 'mClone', 'datePicker', 'calendar']` 这么多模块，
以 `mHistory` 为例：

UMD模块书写方式： (更多方式见[这里](https://github.com/umdjs/umd))

```
;(function (root, factory) {
  if (typeof define === 'function' && define.amd){
    define(factory);
  }else{
    root.mHistory = factory(); //等效于： window.mHistory = {}
  }
}(window, function() {

  //这里开始你的代码
  var mHistory = {
    ...
  }

  return mHistory;
  //代码结束
}));
```

使用方式：

>* requirejs引用：
```
var mHistory = require('mHistory');
mHistory.addState({pop:1});
```

>* 正常引用：
```
<script src="public/src/mHistory/mHistory.js"></script>
<script>
  mHistory.addState({pop:1});
</script>
```




#### 四、 其他可以了解的

##### 1. 关于paths的含义

**（1） `rjs-config-s.js` 和 `rjs-config.js`**

```
({
  baseUrl: '.',
  optimize: 'uglify2', //uglify2
  paths: {
    jquery: '../../jquery/jquery-2.1.4.min',
    zepto: '../../zepto/zepto.1.1.6.min',
    calendar:'../../modules/calendar/calendar'
  }
})
```


**这里的参数都是供r.js使用**

>* `@baseUrl`  忽略，使用时会被覆盖，见第四部分的gulp命令。
>* `@optimize` 是否压缩JS，是为uglify2, 否为none
>* `@paths` 合并amd模块时，需要根据这个映射查找。



**（2） `public/src/demo/module-test/main.js`**

```
require.config({
  paths: {
    jquery: 'src/jquery/jquery-2.1.4.min',
    zepto: 'src/zepto/zepto.1.1.6.min',
    mDialog:'src/modules/mDialog/mDialog'
  }
})
```


**这里的参数都是供requirejs(浏览器)使用**

>* `@paths` requirejs查找依赖模块时使用的映射。


#####2. 关于package.json中以来模块的解释


```
"devDependencies": {
  "gulp": "^3.8.11",  //gulp
  "gulp-less": "~3.0.3",  //less编译
  "gulp-minify-css": "~1.1.1",  //css压缩
  "gulp-rev": "~3.0.1", //静态资源添加版本号
  "gulp-util": "~3.0.4",  //工具函数
  "yargs": "~3.9.1",  //获取命令参数
  "through2": "~0.6.5", //node stream封装
  "del": "~1.2.0" //删除文件或文件夹
}
```










