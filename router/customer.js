const router = require('express').Router();
const customerController = require('../controller/customer');



router.post('/register', async (req, res) => {
    res.send(await customerController.register(req.body));
});

router.post('/login', async (req, res) => {
    res.send(await customerController.login(req.body));
});

router.get('/login1', async (req, res) => {
    res.send(await customerController.login1(req.query.username,req.query.password));
});

module.exports = router;