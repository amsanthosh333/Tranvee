const router = require('express').Router();
const groupController = require('../controller/group');

router.post('/add', async (req, res) => {
	const response = await groupController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await groupController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await groupController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await groupController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await groupController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;