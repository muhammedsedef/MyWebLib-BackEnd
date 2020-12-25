const express = require('express');
const router = express.Router();
const PostCtrl = require('../controllers/post.controller');
const checkAuth = require('../middlewares/check-auth');



//GET BACK ALL THE POSTS
router.get('/', PostCtrl.list);
//SUBMIT THE POST
router.post('/',checkAuth, PostCtrl.create);
//GET SPECIFIC ID 
router.get('/:id', PostCtrl.get);
//UPDATE POST
router.patch('/:id',checkAuth, PostCtrl.update);
//DELETE POST
router.delete('/:id',checkAuth, PostCtrl.delete);

module.exports = router;