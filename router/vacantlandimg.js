const router = require('express').Router();
const vancantlandimgController = require('./../controller/vacantlandimg');

router.post('/add', async (req, res) => {
	const response = await vancantlandimgController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vancantlandimgController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vancantlandimgController.fetchdata(req.query.vacantid);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await vancantlandimgController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await vancantlandimgController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;