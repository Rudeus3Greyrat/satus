const {promisify}=require('util')
const download=promisify(require('download-git-repo'))
const {vueRepo}=require('../config/repo-config')
const {commandSpawn} = require("../utils/terminal");
const open=require('open')
const TEMPLATES = require("../config/constants");
const path = require("path");

// 创建项目的action
const createProjectAction=async (project,nameOrIndex)=>{
    return new Promise((resolve, reject) => {
        let index=0
        if(Number.parseInt(nameOrIndex)) index=nameOrIndex-1
        else {
            index=TEMPLATES.findIndex(tp=>tp.name===nameOrIndex)
        }
        let repo=`direct:${TEMPLATES[index].url}`
        // 1. clone project
        await download(repo,project,{clone:true})
        // 2. npm install
        const npm=process.platform==='wind32'?'npm.cmd':'npm'
        await commandSpawn(npm,['install'],{cwd:`./${project}`})
        // 3. npm run serve
        commandSpawn(npm,['run','serve'],{cwd:`./${project}`})
        // 4. open in browser
        open("http://localhost:8080/")
       // emit template type
        resolve(TEMPLATES[index].flag)
    })
}

// 添加组件的action
const addComponentAction = async (name, dest,flag) => {
    // 1.编译ejs模板 result
    const result = await compile(flag?"vue-component.ejs":"react-component.ejs", {name, lowerName: name.toLowerCase()});

    // 2.写入文件的操作
    const targetPath = path.resolve(dest, `${name}.vue`);
    console.log(targetPath);
    writeToFile(targetPath, result);
}


// 添加组件和路由
const addPageAndRouteAction = async (name, dest,flag) => {
    if(!flag){
        console.warn('currently adding page in react is not supported')
        return
    }
    // 1.编译ejs模板
    const data = {name, lowerName: name.toLowerCase()};
    const pageResult = await compile('vue-component.ejs', data);
    const routeResult = await compile('vue-router.ejs', data);

    // 3.写入文件
    const targetDest = path.resolve(dest, name.toLowerCase());
    if (createDirSync(targetDest)) {
        const targetPagePath = path.resolve(targetDest, `${name}.vue`);
        const targetRoutePath = path.resolve(targetDest, 'router.js')
        writeToFile(targetPagePath, pageResult);
        writeToFile(targetRoutePath, routeResult);
    }
}

const addStoreAction = async (name, dest,flag) => {
    if(!flag){
        console.warn('currently adding store in react is not supported')
        return
    }
    // 1.遍历的过程
    const storeResult = await compile('vue-store.ejs', {});
    const typesResult = await compile('vue-types.ejs', {});

    // 2.创建文件
    const targetDest = path.resolve(dest, name.toLowerCase());
    if (createDirSync(targetDest)) {
        const targetPagePath = path.resolve(targetDest, `${name}.js`);
        const targetRoutePath = path.resolve(targetDest, 'types.js')
        writeToFile(targetPagePath, storeResult);
        writeToFile(targetRoutePath, typesResult);
    }
}

module.exports = {
    createProjectAction,
    addPageAndRouteAction,
    addStoreAction
}
