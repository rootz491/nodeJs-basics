const router = require("express").Router();

router.get("/", (_, res) => {
    res.send("here POST requests are protected");
})


router.post("/push", (req, res) => {
    console.log(req.body.name, req.body.age);
    res.send("thankyou for your interest! we'll get back to you soon :)");
})

module.exports = router;