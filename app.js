const express = require("express");
const sassMiddleware = require("node-sass-middleware");
const path = require("path");
const app = express();
const port = 3000;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentSyntax: false,
    sourceMap: true,
    outputStyle: "compressed",
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.get("", (req, res) => {
  res.render("index");
});

app.listen(port, () => console.log(`http://localhost:${port}`));
