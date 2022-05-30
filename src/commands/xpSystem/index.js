const MessageEmbed = require("discord.js")
const config = require("../../../config.json")
const userModel = require("../../../db/model/userModel")

const level = (message) => {
    userModel.findOneUser(message.author.id)
    .then((res)=>{  
        message.reply("Seu Nivel Atual é: " + res.level+'')
    })
    .catch((err)=>{
        message.reply("Hm... Ocorreu um erro grave")
    })
}

const xp = (message) => {
    userModel.findOneUser(message.author.id)
    .then((res)=>{  
        message.channel.send("Seu XP atual é: "+ res.totalMessages)
    })
    .catch((err)=>{
        message.reply("Hm... Ocorreu um erro grave")
    })
}

const status = (message) => {
    userModel.findOneUser(message.author.id)
    .then((res)=>{  
        const messageEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle('Level')
        .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()})
        .setThumbnail(message.author.avatarURL())
        .addFields(
            { name: "Total Xp", value:res.totalMessages+'', inline:true},
            { name: "Total Mensagens Enviadas: ", value: res.totalMessages+'', inline: true},
            { name: "Level: ", value: res.level+'', inline:true}
        )
        .setTimestamp()
        .setFooter({ text: 'ARYA XP SYSTEM: v'+config.xpSystem, iconURL: 'https://gamehall.com.br/wp-content/uploads/2016/07/Arya-Stark-Game-of-Thrones.jpg' });

        message.channel.send({embeds: [messageEmbed]})
    })
    .catch((err)=>{
        message.reply("Hm... Ocorreu um erro grave" + err)
    })
}


const ranking = async (message) => {
    const result = await userModel.ranking();
    
    const promises = [];
  
    result.forEach(element => {
        const result = get(`https://discord.com/api/v9/users/${element.discordID}`, {
            headers: {
                Authorization: `Bot ${config.token}`
            }
        })
        promises.push(result);
    });
    
    const results = await Promise.all(promises);
    const actualDatas = results.map((result) => result.data); // We need an extra loop to extract the data, and not having the requests stuff
    let field = []
    let index = 0
    result.forEach(element => {
        field[index] = {
            name: ":star:  " + index +" ・ User: " + actualDatas[index].username + "  ・  XP:"  + element.totalMessages +"  ・  Level: "+element.level,
            value: "\u200B"
        }
        index++
    });

    const embedMessage = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Ranking Level")
    .addFields(
        field
    )
    .setFooter({ text: 'ARYA XP SYSTEM: v'+config.xpSystem, iconURL: 'https://gamehall.com.br/wp-content/uploads/2016/07/Arya-Stark-Game-of-Thrones.jpg' });
 
    message.channel.send({embeds: [embedMessage]})
}

module.exports = {
    xp,
    level,
    status,
    ranking
}



