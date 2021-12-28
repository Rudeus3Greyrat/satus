const program=require('commander')
const {createProjectAction,addComponentAction, addPageAndRouteAction, addStoreAction} = require("./action");
// template type
let flag=1


const createCommands=()=>{
    program
        .command('create <project> -t <template>')
        .description('clone repository into a folder')
        .action(()=>createProjectAction().then(val=>flag=val))

    program
        .command('addcpn <name>')
        .description('add component')
        .action((name) => {
            addComponentAction(name, program.dest || 'src/components',flag);
        });

    program
        .command('addpage <page>')
        .description('add page and router config')
        .action((page) => {
            addPageAndRouteAction(page, program.dest || 'src/pages',flag)
        })

    program
        .command('addstore <store>')
        .description('add vue page and router config')
        .action((store) => {
            addStoreAction(store, program.dest || 'src/store/modules',flag)
        })
}

module.exports = createCommands
