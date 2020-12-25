const express = require('express');
const router = express.Router();
const MemberCtrl = require('../controllers/member.controller');

const checkAuth = require('../middlewares/check-auth');
const { userValidationRules, validate, resetPasswordValidationRules } = require('../middlewares/validator');


//GET BACK ALL THE POSTS
router.get('/', MemberCtrl.list);
//CREATE MEMBER
router.post('/signup',userValidationRules(),validate, MemberCtrl.signup);
//GET SPECIFIC MEMBER
router.get('/:id',checkAuth, MemberCtrl.get);
//UPDATE MEMBER
router.patch('/:id',checkAuth, MemberCtrl.update);
//DELETE MEMBER
router.delete('/:id',checkAuth, MemberCtrl.delete);
//LOGIN MEMBER
router.post('/login', MemberCtrl.login);
//RESET MEMBER'S PASSWORD
router.post('/:id/resetPassword',checkAuth,resetPasswordValidationRules(),validate, MemberCtrl.resetPassword);



module.exports = router;