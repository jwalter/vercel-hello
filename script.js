const https = require('https')
const fs = require("fs");

const options = {
    hostname: 'jwalter.builtwithdark.com',
    port: 443,
    path: '/uuid',
    method: 'GET'
  }

  try {
    console.log("👀 Reading current index.html");
    const currentData = fs.readFileSync("./index.html", "utf8");
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
    
      res.on('data', d => {
        process.stdout.write(d)
        if (d !== currentData) {
          console.log("⏳ Writing new index.html file!");
          fs.writeFile("./index.html", d, function (err) {
            if (err) return console.log(err);
            console.log("✅ New index.html file written!");
          });
        } else {
          console.log("🔥 No new data to write! Carry on!");
        }
      })
    })
    
    req.on('error', error => {
      console.error(error)
    })
    
    req.end()
  } catch (error) {
    console.log(error);
  }