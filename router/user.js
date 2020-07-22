const router = require('express').Router();
const userController = require('./../controller/user');



router.post('/register', async (req, res) => {
    res.send(await userController.register(req.body.username, req.body.password,req.body.email,req.body.phone));
});

router.post('/login', async (req, res) => {
    res.send(await userController.login(req.query.username, req.query.password));
});

module.exports = router;

module.exports = router;