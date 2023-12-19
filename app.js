const express=require("express");
const dotenv=require("dotenv").config();
const expressLayouts=require("express-ejs-layouts");
const ejs=require("ejs");
const path=require("path");

const app=express();

const homerouter=require("./src/router/homeRouter");

app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./src/views"));

app.use(express.static("public"));



app.use(express.json());
app.use(express.urlencoded({extended:true}));

//
const passport = require('passport');
var logger = require('morgan');
var session = require('express-session');

var SQLiteStore = require('connect-sqlite3')(session);

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.authenticate('session'));



app.use(expressLayouts);
app.use("/",homerouter);


app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT+ " PORT SERVER AKTİF");
})