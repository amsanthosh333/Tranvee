const router = require('express').Router();
const driverController = require('../controller/driver');


router.post('/register', async (req, res) => {
    res.send(await driverController.register(req.body));
});

router.post('/login', async (req, res) => {
    res.send(await driverController.login(req.body));
});

router.get('/login1', async (req, res) => {
    res.send(await driverController.login1(req.query.Mobileno,req.query.password));
});
router.post('/add', async (req, res) => {
	const response = await driverController.add(req.body);
	res.send(response);
});
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await driverController.fetch();
	res.send(response);
});
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await driverController.fetchdata(req.query.id);
	res.send(response);
});
router.get('/fetchdata1', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await driverController.aggregation(req.query.id);
	res.send(response);
});
router.get('/fetchdriver', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await driverController.aggregationdriver(req.query.referid);
	res.send(response);
});
router.get('/fetchdriverstatus', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await driverController.aggregationdriverstatus(req.query.Status);
	res.send(response);
});
router.delete('/delete', async (req, res) => {
	const response = await driverController.delete(req.query.id);
	res.send(response);
});
router.put('/update', async (req, res) => {
	const response = await driverController.update(req.query.id, req.body);
	res.send(response);
});
router.put('/passwordreset', async (req, res) => {
	const response = await driverController.passwordreset(req.body);
	res.send(response);
})
module.exports = router;