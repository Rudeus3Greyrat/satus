# Satus
## 一个帮助你快速搭建和开发前端项目的CLI

如何安装？

```shell
npm install satus -g
```



## 查看支持的模板

列出所有模板

```shell
satus ls
```

查看模板

```shell
satus view <模板名或者序号>
```



## 创建项目

目前支持Vue和React，Angular考虑中~

vue各个项目模块已经帮你配置：

* 常用的目录结构（你可以在此基础上修改）
* vue.config.js（你可以自行修改和配置）
* axios（网络请求axios的安装以及二次封装）
* vue-router（router的安装和配置，另外有路由的动态加载）
* vuex（vuex的安装和配置，另外有动态加载子模块）

React各个项目模板已经帮你配置：

* 常用的目录结构（你可以在此基础上修改）
* Redux（中间件，基本reducer等，你可以自行修改和配置）
* Webpack（基本打包配置）
* react-router（router的安装和配置，另外有路由的动态加载）



创建项目

```shell
satus create 项目名 -t <模板名>
```

自动拉取项目模板、安装项目依赖、打开浏览器 `http://localhost:8080/`、自动启动项目



## 项目开发

项目开发目前提供三个功能：

* 创建Vue或者React组件
* 创建Vue页面，并配置路由
* 创建Vuex子模块



### 创建Vue组件：

````shell
satus addcpn YourComponentName # satus add NavBar，默认会存放到src/components文件夹中
satus addcpn YourComponentName -d src/pages/home # 也可以指定存放的具体文件夹
````



### 创建Vue页面，并配置路由

```shell
satus addpage YourPageName # 例如satus addpage Home，默认会放到src/pages/home/Home.vue中，并且会创建src/page/home/router.js
satus addpage YourPageName -d src/views # 也可以指定文件夹，但需要手动集成路由
```

为什么会创建router.js文件：

* `router.js`文件是路由的其中一个配置；
* 创建该文件中 `src/router/index.js`中会自动加载到路由的 `routes`配置中，不需要手动配置了（如果是自己配置的文件夹需要手动配置）

`src/router/index.js`中已经完成如下操作：

```js
// 动态加载pages中所有的路由文件
const files = require.context('@/pages', true, /router\.js$/);
const routes = files.keys().map(key => {
  const page = require('@/pages' + key.replace('.', ''));
  return page.default;
})
```



### 创建Vuex子模块

```shell
satus addstore YourVuexChildModuleName # 例如satus addstore home，默认会放到src/store/modules/home/index.js和types.js
satus addstore YourVuexChildModuleName -d src/vuex/modules # 也可以指定文件夹
```

创建完成后，不需要手动配置，已经动态将所有子模块集成进去：

```js
// 动态加载modules
const modules = {}
const files = require.context('./', true, /index\.js$/);
files.keys().filter(key => {
  if (key === './index.js') return false;
  return true
}).map(key => {  
  // 获取名字
  const modulePath = key.replace('./modules/', '');
  const moduleName = modulePath.replace('/index.js', '');
  const module = require(`${key}`);

  modules[`${moduleName}`] = module.default;
})
```





# Documentation

## `Satus: A CLI to help you quickly build and develop front-end projects

How to install？

```shell
npm install satus -g
```

## Create project

Currently Vue and React is supported,  Angular is under consideration~

The vue project module has been configured for you:

- Common directory structure (you can modify on this basis)
- vue.config.js (alias is configured, you can modify and configure more by yourself)
- axios (network request axios installation and secondary packaging)
- vue-router (router installation and configuration, in addition to dynamic loading of routing, detailed description later)
- vuex (installation and configuration of vuex, there are also dynamic loading sub-modules, which will be described in detail later)

The react project module has been configured for you:

- Common directory structure (you can modify on this basis)
- Redux (basic config, middleware, etc)
- Webpack (base pack config)
- react-router (router installation and configuration, in addition to dynamic loading of routing, detailed description later)

Create project

```shell
satus create your_project_name
```

Automatically pull project templates, install project dependencies, open browsers, `http://localhost:8080/`and automatically start projects

## Project Development

Project development currently provides three functions:

- Create Vue or React components
- Create a Vue page and configure routing
- Create Vuex submodule

### Create Vue components:

```shell
satus addcpn YourComponentName satus # example satus add NavBar, the default will be stored in src / components folder 
satus addcpn YourComponentName -d src / Pages and the / Home # specific file can also specify the destination folder
```

### Create a Vue page and configure routing

```shell
satus addPage YourPageName satus # example satus addpage Home, the default will put src / pages / home / Home.vue, and will create a src / Page / Home / router.js 
satus addPage YourPageName -d src / views # You can also specify a folder , But need to integrate routing manually
```

Why is the router.js file created:

- `router.js`The file is one of the routing configurations;
- Create the file `src/router/index.js`will be automatically loaded into the routing `routes`configuration, do not need to manually configured (if it is to configure their own folder requires manual configuration)

`src/router/index.js`The following operations have been completed in:

```js
// Dynamically load all routing files in pages 
const  files  =  require . Context ( '@/pages' ,  true ,  /router \. js $ / ) ; 
const  routes  =  files . Keys ( ) . Map ( key  =>  { 
  const  page  =  require ( '@/pages'  +  key . replace ( '.' ,  '' ) ) ; 
  return  page.default;
})
```

### Create Vuex submodule

```shell
addstore YourVuexChildModuleName satus # example satus addstore home, the default will put src / store / modules / home / index.js and types.js 
satus addstore YourVuexChildModuleName -d src / vuex / modules # You can also specify a folder
```

After the creation is completed, no manual configuration is required, and all sub-modules have been dynamically integrated:

```js
// 动态加载modules
const modules = {}
const files = require.context('./', true, /index\.js$/);
files.keys().filter(key => {
  if (key === './index.js') return false;
  return true
}).map(key => {  
  // 获取名字
  const modulePath = key.replace('./modules/', '');
  const moduleName = modulePath.replace('/index.js', '');
  const module = require(`${key}`);

  modules[`${moduleName}`] = module.default;
})
```
