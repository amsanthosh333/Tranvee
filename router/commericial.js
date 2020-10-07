const router = require('express').Router();
const commericialController = require('./../controller/commericial');

router.post('/add', async (req, res) => {
	const response = await commericialController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await commericialController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await commericialController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await commericialController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await commericialController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;