const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'})
require('./db/conn');
//const User = require('./model/user');

app.use(express.json());
//we are linking the router files to make our route easier
app.use(require('./router/auth'));

const PORT = process.env.PORT;


//Middleware

const middleware = (req,res,next)=>{
 console.log(`Hello my middleware`);
 next();
} 


app.get('/', (req, res)=> {
res.send(`Hello world from the server app.js`);
}); 

app.get('/about' ,middleware, (req, res)=> {
    res.send(`Hello about from the server`);
    }); 

app.get('/contact', (req, res)=> {
res.send(`Hello contact from the server`);
}); 

app.get('/signup', (req, res)=> {
    res.send(`Hello signup from the server`);
    }); 

app.get('/signin', (req, res)=> {
res.send(`Hello signin from the server`);
}); 

app.listen(PORT, ()=> {
    console.log(`Server is running at port no ${PORT}`);
})