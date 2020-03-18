
const express = require ("express")
const helmet = require("helmet")
const welcomeRouter = require("./welcome/welcome-router")
const userRouter = require("./users/users-router")
const authRouter = require("./auth/auth-router")
const session = require("express-session")

const server = express()
const port = process.env.PORT || 5000

const sessionConfig = {
    name: "token", // overwrites the default cookie name, hides our stack better
	resave: false, // avoid recreating sessions that have not changes
	saveUninitialized: false, // GDPR laws against setting cookies automatically
	secret: process.env.COOKIE_SECRET || "secret", // cryptographically sign the cookie
	cookie: {
		httpOnly: true, // disallow javascript from reading our cookie contents
	// 	maxAge: 15 * 1000, // expire the cookie after 15 seconds
	},

}

server.use(helmet())
server.use(express.json())
server.use(session(sessionConfig))


server.use("/",welcomeRouter )
server.use("/users", userRouter)
server.use("/auth", authRouter)

//customized error message
server.use((err,req,res, next) => {
    res.status(500).json({
        message:"Something went Wrong"
    })
})

server.listen(port, ()=> {
    console.log(`running at http://localhost:${port} `)
})