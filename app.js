const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

//console.log(date());

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

var items = ["Buy Food", "Cook Food", "Eat Food"];
var workitems = [];

app.get("/", function (req, res) {
  //always use const insted of var
  // var today =new Date();
  // var day="";
  // if(today.getDay() === 6 || today.getDay()===0){
  //     //res.send("<h1>Yeah! it's weekend</h1>"); to add multiple piece of line
  //     //res.write("<h1>Yeah we can enjoy!");
  //     day ="weekday";
  //     res.render("list",{KindOfDay:day});
  // }
  // else{
  //     // res.write("<h1>I have to work!</h1>");
  //     // res.write("<p>ohhooo!!!!! we need to work more!");
  //     // res.send(); --> instead of writing this much of res.write we can use res.sendFile in one go
  //     res.sendFile(__dirname+"/index.html");

  // }
  //res.sendFile(__dirname+"/index.html");
  //now we want that instead of weekday and weekend we get today's day
  // const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday",
  //                    "Friday","Saturday"];
  // const today =new Date();
  // const day_no = today.getDay();

  // res.render("list",{KindOfDay:weekdays[day_no]});
  // // console.log(day);
  //res.sendFile(__dirname+"/index.html");
  let day = date();
  res.render("list", { listTitle: day, listeditem: items });
});
app.post("/", function (req, res) {
  var item = req.body.item;
  if (req.body.list === "Work") {
    //var workitem = req.body.item;
    workitems.push(item);
    res.redirect("/work");
  }
  //console.log(req.body);
  else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", listeditem: workitems });
});

app.get("/about",function(req,res){
    res.render("about");
})



app.listen(3000, function () {
  console.log("Server is started on port 3000");
});
