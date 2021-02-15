const express = require("express");
const server = express();
const bodyParser=require('body-parser');
const config=require("./../config/config.json")
var mongoose = require('mongoose');
server.use(bodyParser.json());
const cors = require('cors');
server.use(cors());


//locationdata

const userRouter = require('./../router/user');
const groupRouter = require('./../router/group');
const contactRouter = require('./../router/contact');
const adminRouter = require('./../router/admin');
const singlesmsRouter = require('./../router/singlesms');
// console.log("enter")
 let { protocal, host, port, name,username,password } = config.app.db;
 let db= process.env.MONGODB_URL ||`mongodb+srv://admin:admin123@cluster0.qcrci.mongodb.net/schoolsms?retryWrites=true&w=majority`;


console.log('connected to the database',db);


	
mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
    },function(error){
        if(error)
        {
        console.log(error);
  }
        else
        {
        console.log('connected to the database',db);
        }
	});
	//locationdata

server.use("/user", userRouter);
server.use("/category", groupRouter);
server.use("/contact", contactRouter);
server.use("/admin", adminRouter);
server.use("/singlesms", singlesmsRouter);
module.exports= server;