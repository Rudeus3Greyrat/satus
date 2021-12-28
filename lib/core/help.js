const program = require("commander");
const helpOptions=()=>{
    //增加自己的option
    program.option('-d --dest <dest>','a destination folder')
    program.option('-t --template <template>','project template name')
    program.option('ls','list all available templates')

    program.on('--help',function () {
        console.log("")
        console.log("Other:")
        console.log("  other options~")
    })
}
module.exports=helpOptions
