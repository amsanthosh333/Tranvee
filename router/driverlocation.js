const router = require('express').Router();
const driverlocationController = require('../controller/driverlocation');

router.post('/add', async (req, res) => {
	const response = await driverlocationController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await driverlocationController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await driverlocationController.fetchdata(req.query.Driverid);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await driverlocationController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await driverlocationController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;