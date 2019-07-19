var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

//Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//DB Connection
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/NYTScraper";

// mongoose.connect(MONGODB_URI);

//Routes

app.get("/scrape", function (req, res) {

  var nytArticle = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=gAzKnNdjxqXkTdJvRhDX0xw6WK0CvKJM";

  axios.get(nytArticle).then(function (response) {
   
    for (var i = 0; i < response.data.results.length; i ++){
      var title = (response.data.results[i].title);
      var abstract = (response.data.results[i].abstract);
      var url = (response.data.results[i].url);

      var rawArticle = {}

      rawArticle["headline"] = title;
      rawArticle["summary"] = abstract;
      rawArticle["URL"] = url;

      db.Article.create(rawArticle)
      .then(function(dbArticle) {
        console.log(dbArticle);
      })
      .catch(function(err) {
        console.log(err);
      });
  
    }
    //for loop 
       //Get Title from article
      //Get Summary from article
      //Get Url from article
      // Insert into mongo db
    res.json({});
  });
  });

  app.get("/articles",function(req,res){
    db.Article.find({}).then(function(dbArticle){
      res.json(dbArticle);
    })
    .catch(function(err){
      res.json(err);
    })
    });

  app.get("/articles/:id", function(req,res){
    db.Article.findOne({_id:req.params.id}).then(function(dbArticle){
      res.json(dbArticle);
    })
    .catch(function(err){
      res.json(err);
    })
  })

//Server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});