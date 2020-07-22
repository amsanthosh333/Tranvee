const router = require('express').Router();
const locationdataController = require('./../controller/locationdata');

router.post('/add', async (req, res) => {
	const response = await locationdataController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await locationdataController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await locationdataController.fetchdata(req.query.username,req.query.datetime);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await locationdataController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await locationdataController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;