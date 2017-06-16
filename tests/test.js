var fs = require("fs");
var path = require("path");
var css = require("css");
var parser = require("../src/parser");
var _ = require("lodash");

var source = fs.readFileSync(path.resolve("styles.css"), "utf-8");

console.log(parser(source));
