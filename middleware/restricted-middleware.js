const bcrypt = require("bcryptjs")
const models = require("../users/users-model")

function restricted(){
    const authError = {
        message: "invalid credentials",
    }

    return async (req, res, next) => {
            try{
           /*const {username, password} = req.headers
           if (!username || !password) {
               return res.status(401).json(authError)
           }
           
               const user = await models.findUserByFilter({username}).first()
               if(!user) {
                   return res.status(401).json(authError)
               }

               const passwordvalid = await bcrypt.compare(password, user.password)
               if(!passwordvalid) {
                   res.status(401).json(authError) 
               }*/
               // we set `req.session.user` when the user is authenticated in `/login`.
			// so we know if it's not set, the user isn't authenticated yet.
                if(!req.session || !req.session.user) {
                    return res.status(401).json(authError)
                }

               
                     
               next()


            }catch(error){
                next(error)
            }

    }
}

module.exports = restricted