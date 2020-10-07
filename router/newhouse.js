const router = require('express').Router();
const newhouseController = require('./../controller/newhouse');

router.post('/add', async (req, res) => {
	const response = await newhouseController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await newhouseController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await newhouseController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await newhouseController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await newhouseController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;