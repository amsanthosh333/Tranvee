const router = require('express').Router();
const historyController = require('../controller/history');

router.post('/add', async (req, res) => {
	const response = await historyController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await historyController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await historyController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await historyController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await historyController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;