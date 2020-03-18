const express = require ("express")
const bscrypt = require("bcryptjs")
const models = require("../users/users-model")
const restricted = require("../middleware/restricted-middleware")

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try{
        const {username} = req.body
        const user = await models.findUserByFilter({username}).first()
//IF THAT USER ALREADY WAS BUILT
        if (user){
            return res.status(409).json({
                message: "Username is already taken"
            })
        } else {
            res.status(201).json(await models.addUser(req.body))
        }

        }catch(err){
            next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try{
        const{username, password} = req.body
        const user = await models.findUserByFilter ({username}).first()
        const passwordValid = await bscrypt.compareSync(password, user.password)

        if(!user || !passwordValid){
            return res.status(401).json({
                message: "You shall not pass!"
            })
        }
        //      our manual session implementation
//      **********************************************
// 		const authToken = Math.random()
// 		sessions[authToken] = user.id
// 
// 		// res.setHeader("Authorization", authToken)
// 		res.setHeader("Set-Cookie", `token=${authToken}; Path=/`)

        // express-session does the above for us
        
        req.session.user = user
        res.json({
            message:`welcome ${user.username}!`
        })

       

    }catch(error) {
        next(error)
    }
})

router.get("/logout",restricted(), (req, res, next) => {
    // this will delete the session in the database and try to expire the cookie,
	// though it's ultimately up to the client if they delete the cookie or not.
	// but it becomes useless to them once the session is deleted server-side.

    if(req.session) {
        req.session.destroy(err => {
            if (err) {
                res.json({
                    message: "error loging out the user, contact admin"
                })
            } else{
                res.json({message:"You have sucessfully end your session!"}).end()
            }
        })
    }
      
        
    
})



module.exports = router