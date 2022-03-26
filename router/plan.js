const router = require('express').Router();
const planController = require('../controller/plan');

router.post('/add', async (req, res) => {
	const response = await planController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await planController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await planController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await planController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await planController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;