const router = require('express').Router();
const userController = require('./../controller/user');
const { response } = require('../middleware/middleware');

router.post('/add', async function(req, res) {
    let response=await userController.add(req.body);
    res.send(response);
});

router.get('/', async function(req, res) {
    let response=await userController.fetch();
    res.send(response);
});
router.put('/update', async function(req, res) {
    let response=await userController.update(req.query.id,req.body);
    res.send(response);
});
router.delete('/delete', async function(req, res) {
    let response=await userController.delete(req.query.id);
    res.send(response);
});
router.get('/aggregation', async(req, res)=>{
    let response=await userController.aggregation();
    res.send(response);
});
module.exports = router;