const router = require('express').Router();
const singlesmsController = require('../controller/singlesms');

router.post('/add', async (req, res) => {
	const response = await singlesmsController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await singlesmsController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await singlesmsController.fetchdata(req.query.id);
	res.send(response);
})
router.get('/fetchbycategory', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await singlesmsController.fetchdata1(req.query.category);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await singlesmsController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await singlesmsController.update(req.query.id, req.body);
	res.send(response);
})
router.get('/aggregation', async (req, res) =>{
	let response = await singlesmsController.aggregation();
	res.send(response);
	
})
module.exports = router;