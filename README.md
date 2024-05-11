# This API
This API is a simple wordlist API that tells you if a word exists or not, I honestly have no idea why would anyone use this because you can download the thing for free, but sure I guess.
# How to use:
```
// nodejs
// http://wordlist.mipan.site/api/?requestedWord=obvious


axios.request({
  method: "GET",
  url:"http://wordlist.mipan.site/api/?requestedWord=obvious"
}).then((response) => {
  console.log(response.data.existence)
})

// returns "true" boolean
```

```
DEPLOYING:


npm i
node .
```
