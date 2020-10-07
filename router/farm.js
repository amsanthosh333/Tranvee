const router = require('express').Router();
const farmController = require('./../controller/farm');

router.post('/add', async (req, res) => {
	const response = await farmController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await farmController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await farmController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await farmController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await farmController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;