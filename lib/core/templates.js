const program = require("commander");
const TEMPLATES = require("../config/constants");

const templateOptions=()=>{
    program
        .command('ls')
        .description('list all available templates')
        .action(function () {
            console.log("")
            console.log("available templates:")
            TEMPLATES.forEach((tp,index)=>{
                console.log(`${index+1}. ${tp.name}`)
            })
        })

    program
        .command('view <template>')
        .description('list all available templates')
        .action(function (nameOrIndex) {
            let index=0
            if(Number.parseInt(nameOrIndex)) index=nameOrIndex-1
            else {
                index=TEMPLATES.findIndex(tp=>tp.name===nameOrIndex)
            }
            console.log("")
            console.log("templates name:")
            console.log(TEMPLATES[index].name)
            console.log("templates info:")
            console.log(TEMPLATES[index].desc)
        })
}

module.exports = templateOptions
