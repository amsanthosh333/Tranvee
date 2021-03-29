const express = require("express");
const server = express();
const bodyParser=require('body-parser');
const config=require("./../config/config.json")
var mongoose = require('mongoose');
server.use(bodyParser.json());
const cors = require('cors');
server.use(cors());
const admin = require('../tranzporter-f2fc8-firebase-adminsdk-mnit9-f3d6a6cec4.json')
const customerController = require('./../controller/customer');
//locationdata

const userRouter = require('./../router/user');
const customerRouter = require('./../router/customer');
const vechicleRouter = require('./../router/vechicle _mas');
const driverRouter = require('./../router/driver');
const paymentdetailsRouter = require('./../router/paymentdetails');
const booktripRouter = require('./../router/booktrip');
const goodstypeRouter = require('./../router/goodstype');
const cityRouter = require('./../router/city');

// console.log("enter")
 let { protocal, host, port, name,username,password } = config.app.db;
//  let db= process.env.MONGODB_URL ||`mongodb+srv://admin:admin123@cluster0.qcrci.mongodb.net/schoolsms?retryWrites=true&w=majority`;
 let db= process.env.MONGODB_URL ||`mongodb+srv://admin:admin123@cluster0.o2kvb.mongodb.net/TRANZPORTER?retryWrites=true&w=majority`;

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





//driverapi
server.use("/drivervechicle",vechicleRouter);
server.use("/driverreg",driverRouter);
server.use("/booking",booktripRouter);




//customerapi
server.use("/customer",customerRouter);
server.use("/user", async (req, res, next) => {
    console.log("eeeeeeee",""+req.headers.authorization);
	if(!req.headers.authorization){
		return res.send({
			status: 'error',
			msg: 'authorization Token'
			
		})
	}

	await customerController.validateToken(res,req.headers.authorization);

	next();
},userRouter);

server.use("/vechicle", async (req, res, next) => {
    console.log("eeeeeeee",""+req.headers.authorization);
	if(!req.headers.authorization){
		return res.send({
			status: 'error',
			msg: 'authorization Token'
			
		})
	}

	await customerController.validateToken(res,req.headers.authorization);

	next();
},vechicleRouter);
server.use("/driver", async (req, res, next) => {
    console.log("eeeeeeee",""+req.headers.authorization);
	if(!req.headers.authorization){
		return res.send({
			status: 'error',
			msg: 'Invalid null Token'
		})
	}
	await customerController.validateToken(res,req.headers.authorization);
	next();
},driverRouter);
server.use("/paymentdetails", async (req, res, next) => {
    console.log("eeeeeeee",""+req.headers.authorization);
	if(!req.headers.authorization){
		return res.send({
			status: 'error',
			msg: 'Invalid Token'
		})
	}
	await customerController.validateToken(res,req.headers.authorization);
	next();
},paymentdetailsRouter);

server.use("/booktrip", async (req, res, next) => {
    console.log("eeeeeeee",""+req.headers.authorization);
	if(!req.headers.authorization){
		return res.send({
			status: 'error',
			msg: 'Invalid Token'
		})
	}
	await customerController.validateToken(res,req.headers.authorization);
	next();
},booktripRouter);

server.use("/goods", async (req, res, next) => {
    console.log("eeeeeeee",""+req.headers.authorization);
	if(!req.headers.authorization){
		return res.send({
			status: 'error',
			msg: 'Invalid Token'
		})
	}
	await customerController.validateToken(res,req.headers.authorization);
	next();
},goodstypeRouter);
server.use("/city", async (req, res, next) => {
    console.log("eeeeeeee",""+req.headers.authorization);
	if(!req.headers.authorization){
		return res.send({
			status: 'error',
			msg: 'Invalid Token'
		})
	}
	await customerController.validateToken(res,req.headers.authorization);
	next();
},cityRouter);







module.exports= server;