
const {MessageEmbed} = require("discord.js")
const config = require("../config.json")
const { player } = require(".");



module.exports = async () =>{
    player.on("trackStart",async (queue, track) =>{
        const embedMessage = new MessageEmbed()
        .setTitle(track.title)
        .setURL(track.url)
        .setAuthor({name: track.author, iconURL: track.thumbnail})
        .setThumbnail(track.thumbnail)
        .addFields(
            {name: "Duração", value:track.duration,  inline:true},
            {name: "Solicatado por", value:"<@"+track.requestedBy+">", inline:true},
        )
        .setFooter({ text: 'ARYA MUSIC SYSTEM: v'+config.xpSystem, iconURL: 'https://gamehall.com.br/wp-content/uploads/2016/07/Arya-Stark-Game-of-Thrones.jpg' });

        queue.metadata.channel.send({embeds: [embedMessage]})
    })


}