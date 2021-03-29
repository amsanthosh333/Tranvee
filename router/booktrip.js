const router = require('express').Router();
const booktripController = require('../controller/booktrip');
const booktripSchema = require('../model/booktrip');
const vechicleSchema = require('../model/vechicle _mas');

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
router.post('/add', async (req, res) => {
	const response = await booktripController.add(req.body);
	res.send(response);
})
router.post('/firebase/notification', async (req, res) => {
	const response = await booktripController.notification(req.body);
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
	const response = await booktripController.update(req.query.id, req.body);
	res.send(response);
})
router.put('/amount_update', async (req, res) => {
	let detailswaitingcalculation = await booktripSchema.find({'_id':req.query.id});

	let vechicalid=detailswaitingcalculation[0].vechical;
	let StartotpTime=detailswaitingcalculation[0].StartotpTime;
	let StartTripTime=detailswaitingcalculation[0].StartTripTime;
	let Endtriptime=detailswaitingcalculation[0].Endtriptime;
	let ReachDestinationTime=detailswaitingcalculation[0].ReachDestinationTime;
	let estimate=detailswaitingcalculation[0].Amount;

	   let totalDiff = StartTripTime-StartotpTime;
         hours = Math.floor((totalDiff/60));
         minutes =(totalDiff%60);

		 console.log("minutes",""+minutes);
         
	let vechicleSchemacalculation = await vechicleSchema.find({'_id':vechicalid});

	let Waiting_min=vechicleSchemacalculation[0].Waiting_min;
	let min_waiting_time=vechicleSchemacalculation[0].min_waiting_time;
	
	const response = await booktripController.amount_update(req.query.id, req.body);
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
	let response = await booktripController.cloaggregation();
	res.send(response);	
})

router.get('/fetchbookingstatus', async (req, res) =>{
	let response = await booktripController.aggregation1(req.query.Customer,req.query.Bookingstatus);
	res.send(response);	
})
module.exports = router;