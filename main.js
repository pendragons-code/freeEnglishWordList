const express = require("express");
const rateLimitMiddleWare = require("./middlewares/rateLimit.js");
const { wordLookUp } = require("./assets/wordLookUp.js");
const { join } = require("path");
const xss = require("xss");
const { encode } = require("html-entities");
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
	requestedWord = sanitizeInput(requestedWord);
	console.log(requestedWord);
	wordLookUp(requestedWord, (err, found) => {
		if (err) return res.json({ issue: "This api is not working as intended, please come back later!" });
		if (found) wordCache.push(requestedWord);
		// Encode the output
		return res.json({ existence: encodeOutput(found) });
	});
});

// Function to sanitize input using xss library
function sanitizeInput(input) {
	return xss(input);
}

// Function to encode output using html-entities library
function encodeOutput(output) {
	return encode(output);
}

const port = process.env.PORT || 2000; // 'port' should be in uppercase

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port} and process pid is ${process.pid}!`);
});
