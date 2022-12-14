const router = require('express').Router();
const vechicalcostController = require('../controller/vechicalcost');

router.post('/add', async (req, res) => {
	const response = await vechicalcostController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vechicalcostController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vechicalcostController.fetchdata(req.query.id);
	res.send(response);
})
router.get('/fetchdata1', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vechicalcostController.aggregation(req.query.Vechicle);
	res.send(response);
});
router.delete('/delete', async (req, res) => {
	const response = await vechicalcostController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await vechicalcostController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;