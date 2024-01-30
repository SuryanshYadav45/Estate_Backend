const express= require("express");
const paymentController=require("../controller/paymentController.js")
const router= express.Router();

router.post("/create-checkout-session",paymentController.payment)
router.get('/success', paymentController.success);

module.exports=router;