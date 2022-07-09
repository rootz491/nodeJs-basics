const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));

/*
  Authorization Code Grant
  ========================

  URI that initiates oauth transaction:
  https://discord.com/api/oauth2/authorize?response_type=code&client_id=993997262881562775&scope=identify&redirect_uri=http%3A%2F%2Flocalhost%3A1337%2Ftoken&prompt=consent
*/

/*
  Implicit Grant
  ==============

  https://discord.com/api/oauth2/authorize?response_type=token&client_id=993997262881562775&scope=identify
*/

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/dashboard", (req, res) => {
	res.sendFile(__dirname + "/views/dashboard.html");
});

app.get("/token", async (req, res) => {
	try {
		const { code } = req.query;
		if (code == null) {
			res.set("Content-Type", "text/html");
			res.send(`<html><body><script>
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token")
        const token = window.location.hash.split('&')[1].split('=')[1];
        localStorage.setItem(
          "access_token",
          token
        );
        location.href = '/dashboard?auth=implicit';
      </script></body></html>`);
			return;
		} else {
			const discordRes = await axios({
				method: "post",
				url: "https://discord.com/api/oauth2/token",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				data: new URLSearchParams({
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					grant_type: "authorization_code",
					code: code,
					redirect_uri: process.env.REDIRECT_URI,
				}),
			});

			res.redirect(
				`/dashboard?auth=authcode&token=${discordRes.data.access_token}&refresh=${discordRes.data.refresh_token}`
			);
		}
	} catch (error) {
		res.send(error.toString());
	}
});

app.get("/me", async (req, res) => {
	try {
		const token = req.headers.token;
		const discordRes = await axios({
			url: "https://discord.com/api/oauth2/@me",
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		res.json(discordRes.data.user);
	} catch (error) {
		console.log(error);
		res.status(400).json("not valid");
	}
});

app.listen(1337, () => {
	console.log("app is running at http://localhost:1337");
});
