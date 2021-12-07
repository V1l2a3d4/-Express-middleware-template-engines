const express = require("express");
const path = require("path");
const messages = require("./messages");
// const middlewares = require("./middlewares");
// const ejs = require("ejs");
// const fs = require("fs");
// const { promisifyAll } = require("bluebird");
// promisifyAll(ejs);
const nunjucks = require("nunjucks");
const templateDir = path.join(__dirname, "templates");

const server = express();

nunjucks.configure(templateDir, {
  express: server,
  watch: true,
});

// server.use(express.static(path.join(__dirname, "public")));

// server.use(middlewares.parseBody);
server.use(express.urlencoded());
server.use(express.json());

// server.set("view engine", "ejs");
// server.set("views", templateDir);

// server.get("/", async (req, res) => {
//   // const file = fs.readFileSync();
//   try {
//     const html = await ejs.renderFileAsync(
//       path.join(templateDir, "index.ejs"),
//       {
//         userAgent: req.headers["user-agent"],
//         hello: "world"
//       }
//     );
//
//     console.log(html);
//
//     res.send(html);
//   } catch (e) {
//     res.send(e.message);
//   }
// });

server.get("/", (req, res) => {
  // res.render("index.nunjucks", {
  //   userAgent: req.headers["user-agent"],
  //   hello: "world",
  //   arr: [1, 3, 4, 6, 7]
  // });

  const html = nunjucks.render(path.join(templateDir, "index.nunjucks"), {
    userAgent: req.headers["user-agent"],
    hello: "world",
    arr: [1, 3, 4, 6, 7, 8]
  });
  res.send(html);
});

server.use("/messages", messages);

server.listen(3000, () => {
  console.log("Start on port 3000");
});
