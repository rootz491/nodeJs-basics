var express = require('express');
var router = express.Router();


//	router
router.get("/", function (req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

router.get("/login", (req, res) => {
	res.render("login", { title: 'Login' });
});

router.get("/signup", (req, res) => {
	res.render("signup", { title: 'signup' });
});


router.get("/profile", (req, res) => {
	const sessionCookie = req.cookies.session || "";
  
	admin
	.auth()
	.verifySessionCookie(sessionCookie, false /** checkRevoked */)
	.then(() => {
		res.render("profile");
	})
	.catch((error) => {
		res.redirect("/login");
	});
});


module.exports = router;