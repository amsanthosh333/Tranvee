const router = require('express').Router();
const vechicaltypeController = require('../controller/vechicaltype');

router.post('/add', async (req, res) => {
	const response = await vechicaltypeController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vechicaltypeController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vechicaltypeController.fetchdata(req.query.id);
	res.send(response);
})
router.get('/fetchdata1', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vechicaltypeController.aggregation(req.query.Vechicle);
	res.send(response);
});
router.delete('/delete', async (req, res) => {
	const response = await vechicaltypeController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await vechicaltypeController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;