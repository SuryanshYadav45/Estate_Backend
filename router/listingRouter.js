const express= require("express");
const {createListing,getListing, userListing,updateProduct,deleteproduct,userproductListing,getbycategory, deleteListing,updateListing, getUserListing,searchListing,purchasedListing,getuserproductlisting, productListing, getproductlisting}=require("../controller/listingController.js")
const router=express.Router();

router.post('/createlisting',createListing)
router.get('/getlisting',getListing)
router.get('/getUserListing/:id',getUserListing)
router.get('/userlisting/:id',userListing)
router.delete('/deletelisting/:id',deleteListing)
router.post('/updatelisting/:id',updateListing)
router.get('/search',searchListing)
router.get('/purchased/:id',purchasedListing)
router.post('/createproduct',productListing)
router.get('/getproductlisting',getproductlisting)
router.get('/getuserproductlisting/:id',getuserproductlisting)
router.get('/categoryproduct/:category',getbycategory)
router.get('/userproduct/:id',userproductListing)
router.post('/updateProduct/:id',updateProduct)
router.delete('/deleteproduct/:id',deleteproduct)
module.exports=router;