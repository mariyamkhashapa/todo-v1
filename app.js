const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var items = [];
var workitems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.get("/", function(req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);
    res.render("list", { listtitle: day, newlistitem: items });

});

app.get("/work", function(req, res) {
    res.render("list", { listtitle: "work list", newlistitem: workitems });
});
app.post("/", function(req, res) {
    let item = req.body.newitem

    if (req.body.list === "work") {
        workitems.push(item);
        res.redirect("/work");

    } else {
        items.push(item);
        res.redirect("/");

    }

});
app.listen(3000, function() {
    console.log("the server is runnig")
});