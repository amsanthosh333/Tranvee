const router = require('express').Router();
const booktripController = require('../controller/booktrip');
const booktripSchema = require('../model/booktrip');
const planSchema = require('../model/plan');
const driverSchema = require('../model/driver');
const vechicleSchema = require('../model/vechicle _mas');
const historySchema = require('../model/history');
const axios = require('axios')


const historyController = require('../controller/history');
router.post('/add', async (req, res) => {
	const response = await booktripController.add(req.body);
	res.send(response);
})

router.get('/driverlocation', async (req, res) => {
	const response = await booktripController.driverlocation();
	console.log(response)
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
	const response = await booktripController.update(req.query.id, req.query.stat, req.body);
	res.send(response);
})
router.put('/cusupdate', async (req, res) => {
	const response = await booktripController.cusupdate(req.query.id, req.body);
	res.send(response);
})
router.put('/cancelupdate', async (req, res) => {
	const response = await booktripController.cancelupdate(req.query.id, req.query.stat, req.body);
	res.send(response);
})
router.put('/driveracceptupdate', async (req, res) => {
	const response = await booktripController.acceptupdate(req.query.id, req.query.stat, req.body);
	res.send(response);
})
router.put('/amount_update', async (req, res) => {

	let historytrip = {};
	// console.log("minutes",req.query._id);


	let detailswaitingcalculation = await booktripSchema.find({ '_id': req.query._id });

	console.log("detailswaitingcalculation", detailswaitingcalculation)
	let detailplancalculation = await planSchema.find({ '_id': detailswaitingcalculation[0].plan_id });

	let driverculation = await driverSchema.find({ '_id': detailswaitingcalculation[0].Driverid });

	let vechicalid = detailswaitingcalculation[0].vechical;
	let StartotpTime = detailswaitingcalculation[0].StartotpTime;
	let StartTripTime = detailswaitingcalculation[0].StartTripTime;
	let Endtriptime = req.body.Endtriptime;
	let ReachDestinationTime = detailswaitingcalculation[0].ReachDestinationTime;
	let driver = detailswaitingcalculation[0].Driverid;
	console.log("detailplancalculation", detailplancalculation)
	let estimate = parseInt(detailplancalculation[0].baseFare);
	console.log("ReachDestinationTime", ReachDestinationTime);
	console.log("Endtriptime", Endtriptime);
	const diffInMilliseconds = Math.abs(new Date(StartotpTime) - new Date(StartTripTime)) / 1000;
	const firstminminutes = Math.floor(diffInMilliseconds / 60) % 60;
	console.log("minutes", firstminminutes);
	const diffInMilliseconds1 = Math.abs(new Date(ReachDestinationTime) - new Date(Endtriptime)) / 1000;
	const secondminminutes = Math.floor(diffInMilliseconds1 / 60) % 60;
	console.log("minutes", secondminminutes);
	let totalmin = firstminminutes + secondminminutes;
	console.log("totalminutes", totalmin);
	let vechicleSchemacalculation = await vechicleSchema.find({ '_id': vechicalid });

	let limit_min = detailplancalculation[0].timeLimit;
	let limit_km = detailplancalculation[0].distanceLimit;

	let calculate;
	let min_waiting_time;
	let realamount;
	let sum;
	let totalkm;

	let rta;
	await axios.post('https://igps.io/customer/api/get_km_api.php', {
		uname: 'tranvee_logistics_services_9626163696',
		d_from: StartotpTime,
		d_end: Endtriptime
	})
		.then(res => {
			//   console.log(`statusCode: ${res.total}`)
			console.log("res", res.data)
			rta = res.data.filter(it => it.vehicle_no === driverculation[0].VechicleNum);
			// rta = res.data.filter(it => it.vehicle_no === 'TN 42 AJ 5608');

			console.log("rta", rta)
		})
		.catch(error => {
			console.error(error)
		})

	// 	needle.post('https://igps.io/customer/api/get_km_api.php', {
	// 		uname: 'tranvee_logistics_services_9626163696',
	// 		d_from:StartotpTime,
	// 		d_end:Endtriptime
	// 	  }, 
	//     function(err, resp, body){
	//         console.log("data",body);
	//    });
	if (rta.length == 0) {
		totalkm = 0
	} else {
		totalkm = rta[0].total ? rta[0].total : 0;
	}

	if (totalkm > limit_km) {
		calculate = totalkm - limit_km;
		min_waiting_time = detailplancalculation[0].additionDistancePerKm;
		realamount = calculate * min_waiting_time;
		sum = estimate + realamount;

		historytrip.WaitingTime = calculate;
		historytrip.WaitingTimeCharges = realamount;
	} else if (totalmin > limit_min) {
		calculate = totalmin - limit_min;
		min_waiting_time = detailplancalculation[0].additionMinPerMin;
		realamount = calculate * min_waiting_time;
		sum = estimate + realamount;

		historytrip.WaitingTime = calculate;
		historytrip.WaitingTimeCharges = realamount;
	} else {
		sum = estimate;
		historytrip.WaitingTime = limit_min;
		historytrip.WaitingTimeCharges = limit_km;
	}



	console.log("min_waiting_time", min_waiting_time);
	console.log("calculate", calculate);
	console.log("realamount", realamount);
	console.log("sum", sum);
	// console.log("Endtriptime",req.body.Endtriptime);
	// console.log("Bookingstatus",req.body.Bookingstatus);
	let member = {
		"Endtriptime": req.body.Endtriptime,
		"Bookingstatus": "Closed",
		"Driverid": "" + driver,
		"Amount": sum,
	}

	//  console.log("realamount",member);
	const response = await booktripController.amount_update(req.query._id, member);

	let historyres = await historyController.update(req.query._id, historytrip);

	res.send(response);
})
router.get('/aggregation', async (req, res) => {
	let response = await booktripController.aggregation();
	res.send(response);
})
router.get('/totalaggregation', async (req, res) => {
	let response = await booktripController.totalaggregation();
	res.send(response);
})
router.get('/pendingaggregation', async (req, res) => {
	let response = await booktripController.pendingaggregation(req.query.referid);
	res.send(response);
})
router.get('/acceptedaggregation', async (req, res) => {
	let response = await booktripController.acceptedaggregation(req.query._id, req.query.Bookingstatus);
	res.send(response);
})
router.get('/acceptaggregation', async (req, res) => {
	let response = await booktripController.acceptaggregation(req.query.Bookingstatus);
	res.send(response);
})
router.get('/accaggregation', async (req, res) => {
	let response = await booktripController.accaggregation(req.query.Driverid, req.query.Bookingstatus);
	res.send(response);
})


router.get('/acceptaggregation', async (req, res) => {
	let response = await booktripController.accepteaggregation(req.query.Driverid, req.query.Bookingstatus);
	res.send(response);
})

router.get('/statusaggregation', async (req, res) => {
	let response = await booktripController.statusaggregation(req.query.Bookingstatus);
	res.send(response);
})

router.get('/driveraggregation', async (req, res) => {
	let response = await booktripController.driveraggregation(req.query.Driverid);
	res.send(response);
})

router.get('/customeraggregation', async (req, res) => {
	let response = await booktripController.customeraggregation(req.query.customerid);
	res.send(response);
})

router.get('/accptaggregation', async (req, res) => {
	let response = await booktripController.accptaggregation(req.query.referid, req.query.Bookingstatus);
	res.send(response);
})
router.get('/cloaggregation', async (req, res) => {
	let response = await booktripController.cloaggregation(req.query.Driverid, req.query.Bookingstatus);
	res.send(response);
})
router.get('/closeingaggregation', async (req, res) => {
	let response = await booktripController.closeingaggregation(req.query.referid, req.query.Bookingstatus);
	res.send(response);
})
router.get('/fetchbookingstatus', async (req, res) => {
	let response = await booktripController.aggregation1(req.query.Customer, req.query.Bookingstatus);
	res.send(response);
})

router.get('/bookingcount', async (req, res) => {
	let response = await booktripController.count();
	res.send(response);
})

module.exports = router;