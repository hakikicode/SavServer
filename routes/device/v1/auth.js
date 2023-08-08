/**
 * auth.js
 * @description :: express routes of authentication APIs
 */
  
const express =  require('express');
const router  =  express.Router();
const authController =  require('../../../controller/device/v1/authController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/register').post(authController.register);
router.post('/send_login_otp',authController.sendOtpForLogin);
router.post('/login_with_otp',authController.loginWithOTP);
router.route('/logout').post(auth(PLATFORM.DEVICE), authController.logout);
router.get('/login/google',(req,res)=>{
  req.session.platform = 'device';
  res.redirect(`http://localhost:${process.env.PORT}/auth/google`);
});       
router.get('/login/facebook',(req,res)=>{
  req.session.platform = 'device';
  res.redirect(`http://localhost:${process.env.PORT}/auth/facebook`);
});       

module.exports = router;
