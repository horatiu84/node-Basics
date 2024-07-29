const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplates");

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

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = productData
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PROUCT_CARDS%}", cardsHtml);

    res.end(output);

    // PRODUCT PAGE
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = productData[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API PAGE
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // NOT FOUND PAGE
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
