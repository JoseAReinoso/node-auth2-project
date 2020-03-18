const express = require ("express")
const models = require("./users-model")
const restricted = require("../middleware/restricted-middleware")


const router = express.Router()

router.get("/",restricted(), async (req, res, next) => {
    
    try {
        users = await models.findUser()
        res.json(users)
    }catch (error) {
     next(error)
    }
})
module.exports = router