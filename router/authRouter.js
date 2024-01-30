const express= require("express");
const authController= require("../controller/authController.js")
const router= express.Router();

router.post('/signup',authController.signup);
router.post('/signin',authController.signin);
router.post('/signin/google',authController.googleSignin);

module.exports=router;