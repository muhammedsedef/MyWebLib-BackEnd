const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();


//Import Routes Buraya gelen istekleri ilgili js dosyasına yonlendirip handleyacaz.
const postsRoute = require('./routes/post.route');
const membersRoute = require('./routes/member.route');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

// ROUTES
app.get('/', (req,res) =>{
    res.send('We are on API Home');
});


// /post üzerinden gelen istekleri postsRoute ile belirledigimiz js dosyasında yapıcaz 
app.use('/posts', postsRoute);
app.use('/members', membersRoute);

mongoose.Promise = Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
var mongooseOptions = { useNewUrlParser: true };

mongoose
  .connect(process.env.DB_CONNECTION, mongooseOptions)
  .then(() => {
    console.log("DataBase Connection Successful!");
  })
  .catch(err => {
    console.log("DataBase Connection Failed!" + err);
  });


module.exports = app;


