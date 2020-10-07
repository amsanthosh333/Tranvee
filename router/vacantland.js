const router = require('express').Router();
const vancantController = require('./../controller/vacantland');

router.post('/add', async (req, res) => {
	const response = await vancantController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vancantController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vancantController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await vancantController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await vancantController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;