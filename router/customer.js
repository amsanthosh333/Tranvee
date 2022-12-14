const router = require('express').Router();
const customerController = require('../controller/customer');

router.post('/register', async (req, res) => {
    res.send(await customerController.register(req.body));
});

router.post('/login', async (req, res) => {
    res.send(await customerController.login(req.body));
});

router.get('/login1', async (req, res) => {
    res.send(await customerController.login1(req.query.phone,req.query.password));
});
router.post('/add', async (req, res) => {
	const response = await customerController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await customerController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await customerController.fetchdata(req.query.id);
	res.send(response);
})
router.get('/fetchcustomer', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await customerController.fetchcustomer(req.query.referid);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await customerController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await customerController.update(req.query.id, req.body);
	res.send(response);
})
router.put('/passwordreset', async (req, res) => {
	const response = await customerController.passwordreset(req.body);
	res.send(response);
})
module.exports = router;