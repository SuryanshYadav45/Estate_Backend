require("dotenv").config({path:"../.env"})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PurchaseModel=require('../models/PurchaseModel.js')


const payment= async (req, res) => {
    
    const {property,userId,propertyId}=req.body;
    const lineItems = property.map((property)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:property.name,
                images:property.image
            },
            unit_amount:property.price * 100,
        },
        quantity:property.quantity
    }));
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items:lineItems,
      mode:'payment',
      success_url: `https://backendestate.onrender.com/payment/success?session_id={CHECKOUT_SESSION_ID}&propertyId=${propertyId}&userId=${userId}`,
      cancel_url: `https://realtorsy.netlify.app/cancel`,
    });
    res.status(200).json(session.url);
  };


  const success=async(req,res)=>
  {
    try {
      const { session_id,propertyId,userId } = req.query;
      const session = await stripe.checkout.sessions.retrieve(session_id);
      const paymentId = session.payment_intent;
      const history= await PurchaseModel.create({
        userId,
        paymentId,
        propertyId
      })
      if(!history)
      {
        res.redirect("https://realtorsy.netlify.app/cancel");
      }
      res.redirect("https://realtorsy.netlify.app//success");
      

      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports={payment,success}