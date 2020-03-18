const bcrypt = require("bcryptjs")
const db = require ("../data/config")


function findUser() {
    return db("users")
    .select("id", "username")
}

function findUserById(id) {
    return db("users")
    .select("id", "username")
    .where({id})
    .first()
}

function findUserByFilter(filter) {
    return db("users")
    .select("id", "username", "password")
    .where(filter)
}


//adding an user
async function addUser (user) {
    // hash the password with a time complexity of 14(time complexity just add time to avoid hackers from fiding password combinations)
	user.password = await bcrypt.hash(user.password, 14)
  
    const [id] = await db("users")
    .insert(user)
    return findUserById(id)

}

module.exports = {
    findUser,
    findUserById,
    findUserByFilter,
    addUser

}