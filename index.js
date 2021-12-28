#!/usr/bin/env node

const program=require('commander')

const helpOptions=require('./lib/core/help')

const createCommands=require('./lib/core/create')
const templateOptions = require("./lib/core/templates");

//查看版本号
program.version(require('./package.json').version)

//帮助和可选信息
helpOptions()

//模板相关信息
templateOptions()

//创建指令
createCommands()

program.parse(process.argv)

