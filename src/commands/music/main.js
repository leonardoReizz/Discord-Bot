

const { player } = require("../../index")


const play = async  ( client, message, args, command ) =>{
    
    const channel = message.member.voice.channel;
    if(!channel)
        return message.reply("Voce precisa estar em um canal de voz");

    const searchMusic = args.join(" ");
    
    if(!searchMusic)
        return message.reply("Digite o nome ou link da musica");

    const queue = player.createQueue(message.guild.id, {
        metadata: {
            channel: message.channel,
        },
    });
    
    try{
        if(!queue.connection) await queue.connect(channel);
    }catch(e){
        queue.destroy();
        return await message.reply({
            content: "Nao foi possivel entrar no canal de voz",
        })
    }
   

    const song = await player
    .search(searchMusic, {
        requestedBy: message.author
    })
    .then((x) => x.tracks[0]);
    client.user.setActivity(song.title,{type:"LISTENING"});

    if(!song) return message.reply("Hmm... Ocorreu um erro ao procurar essa musica")
    queue.play(song)

    message.reply(" :hourglass_flowing_sand: Adicionado a Fila ```"+song.title+"```")
}

const skip = (client ,message,args,command) =>{
    const queue = player.getQueue(message.guild.id)
    queue.skip();
    message.channel.send("Proxima.")
}

const stop = (client,message ,args,command) => {
    const queue = player.getQueue(message.guild.id)
    queue.stop();
    message.channel.send("Parandooo...")
}


module.exports = {
    play,
    skip,
    stop
}