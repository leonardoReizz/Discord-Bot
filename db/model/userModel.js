
const {model, Schema} = require("mongoose")
  

 const userSchema = new Schema({
    discordID: String,
    level: Number,
    xp: Number, // 2,147,483,647
    totalMessages: Number,
})

 const dbUser = model("User",userSchema,'user')

const findOneUser = async (discordID) => {
    const user = await dbUser.findOne({discordID: discordID})
    .then((res)=>{
        return res 
    })
    .catch((err) => {
        return err
    })
    return user;
}
const create = async (user) =>{
    const insertedUser = await dbUser.create(user)
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err
    })
    return insertedUser
} 
const updateMessages = async (discordID , totalMessages) => {
    const user = await dbUser.updateOne({discordID: discordID}, {$set:{totalMessages:totalMessages}})
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err
    })
    return user;
}

const ranking = async () => {
    const result = await dbUser.find().limit(10).sort({field: 'asc',totalMessages:-1})
    .then((res)=>{
        return res;                    
    })  
    .catch((err)=>{
       return err
    })
    return result

}


module.exports = {
    findOneUser,
    updateMessages,
    create,
    ranking
}
