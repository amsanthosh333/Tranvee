const router = require('express').Router();
const booktripController = require('../controller/booktrip');
const booktripSchema = require('../model/booktrip');
const vechicleSchema = require('../model/vechicle _mas');


router.post('/add', async (req, res) => {
	const response = await booktripController.add(req.body);
	res.send(response);
})

router.post('/amount', async (req, res) => {
	const response = await booktripController.amountcalc(req.body);
	res.send(response);
})
router.post('/firebase/notification', async (req, res) => {
	const response = await booktripController.notification();
	res.send(response);
})
router.post('/firebase/common/notification', async (req, res) => {
	const response = await booktripController.commonnotification();
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await booktripController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await booktripController.fetchdata(req.query.id);
	res.send(response);
})
// router.post('/fetchbodydata', async (req, res) => {
//     res.send(await booktripController.fetchbodydata(req.body));
// });
router.get('/fetchbookdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await booktripController.fetchbookdata(req.query.Customer);
	res.send(response);
})

router.delete('/delete', async (req, res) => {
	const response = await booktripController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await booktripController.update(req.query.id,req.query.stat,req.body);
	res.send(response);
})
router.put('/cusupdate', async (req, res) => {
	const response = await booktripController.cusupdate(req.query.id, req.body);
	res.send(response);
})
router.put('/cancelupdate', async (req, res) => {
	const response = await booktripController.cancelupdate(req.query.id,req.query.stat,req.body);
	res.send(response);
})
router.put('/driveracceptupdate', async (req, res) => {
	const response = await booktripController.acceptupdate(req.query.id,req.query.stat,req.body);
	res.send(response);
})
router.put('/amount_update', async (req, res) => {


	// console.log("minutes",req.query._id);


	let detailswaitingcalculation = await booktripSchema.find({'_id':req.query._id});

	let vechicalid=detailswaitingcalculation[0].vechical;
	let StartotpTime=detailswaitingcalculation[0].StartotpTime;
	let StartTripTime=detailswaitingcalculation[0].StartTripTime;
	let Endtriptime=req.body.Endtriptime;
	let ReachDestinationTime=detailswaitingcalculation[0].ReachDestinationTime;
	let driver=detailswaitingcalculation[0].Driverid;

    	let estimate=parseInt(detailswaitingcalculation[0].Amount);
		console.log("ReachDestinationTime",ReachDestinationTime);
		console.log("Endtriptime",Endtriptime);
	     const diffInMilliseconds = Math.abs(new Date(StartotpTime) - new Date(StartTripTime))/1000;
	     const firstminminutes = Math.floor(diffInMilliseconds / 60) % 60;
		 console.log("minutes",firstminminutes);
		 const diffInMilliseconds1 = Math.abs(new Date(ReachDestinationTime) - new Date(Endtriptime))/1000;
	     const secondminminutes = Math.floor(diffInMilliseconds1 / 60) % 60;
	     console.log("minutes",secondminminutes);
         let totalmin=firstminminutes+secondminminutes;
		 console.log("totalminutes",totalmin);
	     let vechicleSchemacalculation = await vechicleSchema.find({'_id':vechicalid});




	let Waiting_min=vechicleSchemacalculation[0].Waiting_min;

	let calculate;
	let min_waiting_time;
	let realamount;
	let sum;
	
	if(totalmin>Waiting_min){
		calculate=totalmin-Waiting_min;
		min_waiting_time=vechicleSchemacalculation[0].min_waiting_time;
		realamount=calculate*min_waiting_time;
	    sum = estimate + realamount ;
	}else{
		sum = estimate;
	}



	console.log("min_waiting_time",min_waiting_time);
	console.log("calculate",calculate);
	console.log("realamount",realamount);
	console.log("sum",sum);
	// console.log("Endtriptime",req.body.Endtriptime);
	// console.log("Bookingstatus",req.body.Bookingstatus);
	let member={
		"Endtriptime":req.body.Endtriptime,
		"Bookingstatus":"Closed",
		"Driverid":""+driver,
		"Amount":sum,
		 }
		//  console.log("realamount",member);
	const response = await booktripController.amount_update(req.query._id,member);
	res.send(response);
})
router.get('/aggregation', async (req, res) =>{
	let response = await booktripController.aggregation();
	res.send(response);	
})
router.get('/accaggregation', async (req, res) =>{
	let response = await booktripController.accaggregation(req.query.Driverid,req.query.Bookingstatus);
	res.send(response);	
})
router.get('/cloaggregation', async (req, res) =>{
	let response = await booktripController.cloaggregation(req.query.Driverid,req.query.Bookingstatus);
	res.send(response);	
})

router.get('/fetchbookingstatus', async (req, res) =>{
	let response = await booktripController.aggregation1(req.query.Customer,req.query.Bookingstatus);
	res.send(response);	
})
module.exports = router;