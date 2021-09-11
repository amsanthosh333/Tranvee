const router = require('express').Router();
const designationController = require('../controller/designation');

router.post('/add', async (req, res) => {
	const response = await designationController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await designationController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await designationController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await designationController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await designationController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;