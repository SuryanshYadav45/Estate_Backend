const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  paymentId: String,
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'properties',
  },
});

const PurchaseModel=mongoose.model("Purchase",purchaseSchema);

module.exports=PurchaseModel;