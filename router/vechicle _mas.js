const router = require('express').Router();
const vechicleController = require('../controller/vechicle _mas');

router.post('/add', async (req, res) => {
	const response = await vechicleController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vechicleController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vechicleController.fetchdata(req.query.id);
	res.send(response);
})
router.get('/fetchopenvechicle', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vechicleController.fetchopenvechicle();
	res.send(response);
})
router.get('/fetchclosevechicle', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vechicleController.fetchclosevechicle();
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await vechicleController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await vechicleController.update(req.query.id, req.body);
	res.send(response);
})
router.get('/aggregation', async (req, res) =>{
	let response = await vechicleController.aggregation(req.query.VechicleType);
	res.send(response);	
})
module.exports = router;