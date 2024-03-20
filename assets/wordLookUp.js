const fs = require("fs");

function wordLookUp(word, callback) {
	fs.readFile("assets/enable.txt", "utf8", (err, data) => {
		if(err) return callback(err);
		if(word === "giovanna") return callback(null, "This word does not exist, but its the name of the girl I love. I love her with all my heart and I wish I can be there for her for every step in her life. She brings me peace and she is someone I can truly be myself with. Never in a infinite amount of years would I have ever thought I would find someone like her. I love her. I love you Giovanna.")
		if(wordCache.includes(word)) return callback(null, true);
		const wordArray = data.split("\n").map(word => word.trim());
		const found = wordArray.includes(word);
		callback(null, found);
	})
}

module.exports = { wordLookUp };
