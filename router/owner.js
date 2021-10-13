const router = require('express').Router();
const ownerController = require('./../controller/owner');

router.post('/register', async (req, res) => {
    res.send(await ownerController.register(req.body));
});
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await ownerController.fetch();
	res.send(response);
})
router.post('/login', async (req, res) => {
    res.send(await ownerController.login(req.body));
});

router.get('/login1', async (req, res) => {
    res.send(await ownerController.login1(req.query.username,req.query.password));
});
router.post('/add', async (req, res) => {
	const response = await ownerController.add(req.body);
	res.send(response);
})
router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await ownerController.fetch();
	res.send(response);
})
router.get('/fetchdata', async (req, res) => {
	//res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await ownerController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await ownerController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await ownerController.update(req.query.id, req.body);
	res.send(response);
})
module.exports = router;