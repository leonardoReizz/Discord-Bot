const config = require("../../../config.json")
const hello = (arya) => {
    arya.on("messageCreate", async message => {
        message.content.startsWith(config.prefix) &&
            message.content.endsWith("oi") && message.reply("Ola")
    })
}   

export default {
    hello
}