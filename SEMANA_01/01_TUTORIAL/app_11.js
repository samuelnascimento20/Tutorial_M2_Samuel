var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.get("/", function(require,res)
{
  res.header("Acess-Cotrol")
  res.send("Olá!")
})