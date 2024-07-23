const fs = require("fs");
const http = require("http");
const url = require("url");

////////////////////////////////////////////////////
//                FILE SYSTEM

/*
// Blocking, syncronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const infos = `This is what we know about avocado : ${textIn} \nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", infos);
console.log(infos);

// Non blocking, asyncronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
    fs.readFile("./txt/append.txt", "utf-8", (err, data2) => {
      fs.writeFile("./txt/final.txt", `${data1} \n${data2}`, "utf-8", (err) => {
        console.log("File was written!");
      });
    });
  });
});
console.log("Read the file:");

*/

////////////////////////////////////////////////////
//                SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT!");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(9000, "127.0.0.1", () => {
  console.log("Listening to requests on port 9000");
});
