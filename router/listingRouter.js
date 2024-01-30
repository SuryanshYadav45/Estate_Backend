const express= require("express");
const {createListing,getListing, userListing, deleteListing,updateListing, getUserListing,searchListing,purchasedListing}=require("../controller/listingController.js")
const router=express.Router();

router.post('/createlisting',createListing)
router.get('/getlisting',getListing)
router.get('/getUserListing/:id',getUserListing)
router.get('/userlisting/:id',userListing)
router.delete('/deletelisting/:id',deleteListing)
router.post('/updatelisting/:id',updateListing)
router.get('/search',searchListing)
router.get('/purchased/:id',purchasedListing)

module.exports=router;