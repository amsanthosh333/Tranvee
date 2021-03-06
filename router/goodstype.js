const router = require('express').Router();
const goodstypeController = require('../controller/goodstype');

router.post('/add', async (req, res) => {
	const response = await goodstypeController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await goodstypeController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await goodstypeController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await goodstypeController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await goodstypeController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;