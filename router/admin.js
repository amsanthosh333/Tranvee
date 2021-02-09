const router = require('express').Router();
const adminController = require('./../controller/admin');



router.post('/register', async (req, res) => {
    res.send(await adminController.register(req.body));
});

router.post('/login', async (req, res) => {
    res.send(await adminController.login(req.body));
});

router.get('/login1', async (req, res) => {
    res.send(await adminController.login1(req.query.username,req.query.password));
});
router.get('/count', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await adminController.fetch();
	res.send(response);
})
module.exports = router;