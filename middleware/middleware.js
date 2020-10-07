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
const vacantlandRouter = require('../router/vacantland');

// console.log("enter")
 let { protocal, host, port, name,username,password } = config.app.db;
 let db= process.env.MONGODB_URL ||`${protocal}${username}:${password}${host}:${port}/${name}`;


console.log('connected to the database',db);

// mongoose.connect("mongodb://localhost:27017/testDb", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
//     },function(error){
//         if(error){
//         console.log(error);
//         }else{
// 	console.log('connected to the database',db);
//         }
// 	});
	
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
server.use("/vancantland", vacantlandRouter);


module.exports= server;