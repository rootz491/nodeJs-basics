var express = require('express');
var router = express.Router();


//	login req
router.post("/sessionLogin", (req, res) => {
	const idToken = req.body.idToken.toString();
  
	const expiresIn = 60 * 60 * 24 * 5 * 1000;
  
	admin
	.auth()
	.createSessionCookie(idToken, { expiresIn })
	.then(
	(sessionCookie) => {
		const options = { maxAge: expiresIn, httpOnly: true };
		res.cookie("session", sessionCookie, options);
		res.end(JSON.stringify({ status: "success" }));
	},
	(error) => {
		res.status(401).send("UNAUTHORIZED REQUEST!");
	}
	);
});

//	logout req
router.get("/sessionLogout", (req, res) => {
	res.clearCookie("session");
	res.redirect("/login");
});


module.exports = router;