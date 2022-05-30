
const Discord = require("discord.js")
const config = require("../config.json")

const { Player } = require("discord-player")


const client = new Discord.Client({
    restTimeOffset: 0,
    allowedMentions: {
        parse: [],
        repliedUser: false
    },
    shards:"auto",
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
    ],
})

const player = new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
    leaveOnEmptyCooldown: 5000,
    autoSelfDeaf: true,
    initialVolume: 50,
    bufferingTimeout: 3000,
});



client.on("ready", ()=>{
    console.log(`Logged into: ${client.user.tag}`)
})

require("./commands/xpSystem/observer").observer(client)

client.on("messageCreate", async message =>{
    if(!message.guild || message.author.bot ) return;
    if(!message.content.startsWith(config.prefix)) return ;
    
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase()

    require("./commands")(client, message, args, command)
})

module.exports = { player, client}
require("./events")(client)
client.login(config.token)

