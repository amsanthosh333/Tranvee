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
const vacantlandimgRouter = require('../router/vacantlandimg');
const newhouseRouter = require('../router/newhouse');
const commericialRouter = require('../router/commericial');
const farmRouter = require('../router/farm');
const partyRouter = require('../router/party');

// console.log("enter")
 let { protocal, host, port, name,username,password } = config.app.db;
 let db= process.env.MONGODB_URL ||`mongodb+srv://admin:admin@realestate.qcmhu.mongodb.net/realestate?retryWrites=true&w=majority`;


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
server.use("/vancantlandimg", vacantlandimgRouter);
server.use("/newhouse", newhouseRouter);
server.use("/commericial", commericialRouter);
server.use("/farm", farmRouter);
server.use("/party", partyRouter);



module.exports= server;