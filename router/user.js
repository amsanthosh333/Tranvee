const router = require('express').Router();
const userController = require('./../controller/user');



router.post('/register', async (req, res) => {
    res.send(await userController.register(req.body));
});

router.post('/login', async (req, res) => {
    res.send(await userController.login(req.body));
});

router.get('/login1', async (req, res) => {
    res.send(await userController.login1(req.query.username,req.query.password));
});
router.get('/count', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await userController.fetch();
	res.send(response);
})
module.exports = router;