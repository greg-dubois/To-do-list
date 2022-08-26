
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items = [];
var workItems = [];

app.get("/", function(req, res){

  var today = new Date();
  var day = "";

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  day = today.toLocaleDateString("en-US", options);

  res.render("list", {listTitle: day, addToList: items});

});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", addToList: workItems});
});


app.post("/", function (req, res) {

  var item = req.body.newItem;

  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});


app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
