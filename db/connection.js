const {connect} = require("mongoose")

const connection = async () => {
    return await connect("DB CONNECTION")
}

module.exports = {
    connection
}
