const router = require('express').Router();
const paymentdetailsController = require('../controller/paymentdetails');

router.post('/add', async (req, res) => {
	const response = await paymentdetailsController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await paymentdetailsController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await paymentdetailsController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await paymentdetailsController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await paymentdetailsController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;