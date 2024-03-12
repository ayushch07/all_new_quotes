const express=require('express');
const app=express();
const cors = require('cors')
const mongoose=require('mongoose');
const seedData = require('./seed');
const Quotes=require('./Routes/QuoteRoutes');
const authRoutes = require('./Routes/auth');
const passport = require('passport');
const session=require('express-session');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
mongoose.connect('mongodb://127.0.0.1:27017/all-newQuotes')
.then(()=>{
    console.log("DB connected successfully")
})
.catch((err)=>{
    console.log("DB error"); 
    console.log(err)
});
//sesssion
let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true , 
    cookie: { 
        httpOnly: true ,
        expires: Date.now() + 24*7*60*60*1000 , 
        maxAge:24*7*60*60*1000
    }
}
app.use(session(configSession));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(passport.initialize());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
app.use(cors());
// seedData();
app.get('/',(req,res)=>{
    res.send('Hello World')
});
app.use(Quotes);
app.use(authRoutes);
app.listen('8000',()=>{
    console.log("Server listening on 8000");
}
)
