const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        message: "welcome to Users authentication API"
    })
})

module.exports = router