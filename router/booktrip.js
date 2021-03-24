const router = require('express').Router();
const booktripController = require('../controller/booktrip');

router.post('/add', async (req, res) => {
	const response = await booktripController.add(req.body);
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
router.get('/aggregation', async (req, res) =>{
	let response = await booktripController.aggregation();
	res.send(response);	
})
router.get('/accaggregation', async (req, res) =>{
	let response = await booktripController.accaggregation();
	res.send(response);	
})

router.get('/fetchbookingstatus', async (req, res) =>{
	let response = await booktripController.aggregation(req.query.Customer,req.query.Bookingstatus);
	res.send(response);	
})
module.exports = router;