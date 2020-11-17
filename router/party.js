const router = require('express').Router();
const partyController = require('./../controller/party');

router.post('/add', async (req, res) => {
	const response = await partyController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await partyController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await partyController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await partyController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await partyController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;