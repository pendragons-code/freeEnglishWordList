const express = require("express");
const rateLimitMiddleWare = require("./middlewares/rateLimit.js");
const { wordLookUp } = require("./assets/wordLookUp.js");
const { join } = require("path");
const app = express();
require("dotenv").config();

global.wordCache = []; // not the smartest way to build a cache

app.use(rateLimitMiddleWare);
app.use(express.static(join(__dirname, "public")));
app.set('trust proxy', 1);

app.get("/", (req, res) => {
	return res.sendFile("./public/html/index.html");
});

app.get("/api/", async (req, res) => {
	let requestedWord = req.query.requestedWord; // /api/?requestedWord=obsolete
	wordLookUp(requestedWord, (err, found) => {
		if(err) return res.json({ issue: "This api is not working as intended, please come back later!" });
		if(found) wordCache.push(requestedWord);
		return res.json({ existence: found });
	});
});

const port = process.env.port || 2000;

app.listen(port,() => {
	console.log(`Server running on http://localhost:2000 and process pid is ${process.pid}!`);
});
