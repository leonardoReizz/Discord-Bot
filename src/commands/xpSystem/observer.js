const  userModel = require("../../../db/model/userModel")

const db = require("../../../db/connection")


const level = [0,5000,15000,25000,50000,80000,120000,180000,300000,550000,810000,
    1500000,3000000,6000000,1000000,20000000
]

const observer = async (client) =>  {
   client.on("messageCreate", async message =>{
        db.connection()
        let discordID = message.author.id
        const user = await userModel.findOneUser(discordID)
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err)
        })

        if(user === null){
            const createUser = {
                discordID: discordID,
                totalMessages: 0,
                xp: 0,
                level: 0
            }
            userModel.create(createUser);
        }else{
            userModel.updateMessages(discordID, Number(user.totalMessages + 1))
            verifyXP(user, message)
        }
   })
}

const verifyXP = (user, message) => {
    var i = 0;
    while(i != -1){
        if(i + 1 < level.length){
            if(user.totalMessages >= level[i] && user.totalMessages <= level [i+1]){
                user.level > i &&
                    dbUser.updateOne({discordID: user.discordID, $set: {level: i}})
                    .then(()=>{
                        message.reply("Parabens Você Subiu de Level :partying_face:. \n Level Atual: " + i)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    break;
            }
        }else{
            user.totalMessages >= level[i] &&
                user.level < i &&
                    dbUser.updateOne({discordID: user.discordID, $set: {level: i}})
                    .then(()=>{
                        message.reply("Parabens Você Subiu de Level :partying_face: \n. Level Atual: " + i)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    break;
        }
        i++;
    }
}



module.exports = { 
    observer
}