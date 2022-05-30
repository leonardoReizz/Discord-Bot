


module.exports = async (client, message, args, command) =>{
    command === 'play' 
    ?    require("./commands/music/main").play(client,message,args,command)
    : command === 'skip'
    ?    require("./commands/music/main").skip(client,message,args,command)
    : command === 'stop'
    ?   require("./commands/music/main").stop(client,message,args,command)
    : command === 'xp'
    ?   require("./commands/xpSystem/index").xp(message)
    : command === 'level'
    ?   require("./commands/xpSystem/index").level(message)
    : command === 'status'
    ?   require("./commands/xpSystem/index").status(message)
    : command === 'ranking'
    ?   require("./commands/xpSystem/index").ranking(message)
    :''
}