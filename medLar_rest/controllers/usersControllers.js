var bcrypt = require('bcrypt')
var User = require('../models/User')

module.exports.getUserById = async (id) => {
    User.findAll({
        where: {
            id: id
        }
    }).then(u => console.log(u))
}

module.exports.validatePassword = async (id, password) => {
    user = await this.getUserById(id)
    if(!user) 
        throw new Error("Utilizador não encontrado!")

    var compare = await bcrypt.compare(password, user.password)

    if(!compare)
        throw new Error ("Invalid password")

    return user
}