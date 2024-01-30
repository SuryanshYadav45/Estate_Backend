const mongoose = require("mongoose");

const propertySchema= new mongoose.Schema({
    propname:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,

    },
    address:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    beds:{
        type:Number,
        required:true,
    },
    bathrooms:{
        type:Number,
        required:true
    },
    parking:{
        type:Boolean,
        required:true
    },
    furnished:{
        type:Boolean,
        required:true
    },
    imageurls:{
        type:Array,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }

},{timestamps:true})

propertySchema.index({propname: 'text'});

const PropertyModel= mongoose.model('properties',propertySchema);

module.exports=PropertyModel;