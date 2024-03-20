const fs = require("fs");

function wordLookUp(word, callback) {
	fs.readFile("assets/enable.txt", "utf8", (err, data) => {
		if(err) return callback(err);
		if(wordCache.includes(word)) return callback(null, true);
		const wordArray = data.split("\n").map(word => word.trim());
		const found = wordArray.includes(word);
		callback(null, found);
	})
}

module.exports = { wordLookUp };
