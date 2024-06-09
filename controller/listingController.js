const ProductModel = require("../models/ProductModel");
const PropertyModel = require("../models/PropertyModel");
const PurchaseModel = require("../models/PurchaseModel");


const createListing = async (req, res) => {
    const { propname, desc, imageurls, userid, furnished, parking, beds, price, address, bathrooms, type } = req.body;

    const user = await PropertyModel.create({
        propname, desc, imageurls, userid, furnished, parking, beds, price, address, bathrooms, type
    })
    res.status(201).json({ user });
}

const productListing=async (req, res)=>{
    const {prodname,description,price,stock,category,imageurls,userid}=req.body;

    const product= await ProductModel.create({
        prodname,description,price,stock,category,imageurls,userid
    });
     res.status(201).json({message:"Product created"});
}

const getuserproductlisting=async (req,res)=>{
    const{id}=req.params;
    const listing = await ProductModel.findById(id);

    listing ? res.status(200).json(listing) : res.status(404).json("no listing found");
}

const getproductlisting=async(req, res)=>
    {
        try {
            const data = await ProductModel.find({})
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json("error occured")
        }
    }
    const getbycategory=async(req,res)=>{
        try {
            const {category}=req.params;
            const listing= await ProductModel.find({category})
            res.status(200).json(listing);
            
        } catch (error) {
            console.log(error)
            res.status(500).json("server error");
        }
    }    


const getListing = async (req, res) => {
    try {
        const data = await PropertyModel.find({})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json("error occured")
    }
}
const userListing = async (req, res) => {
    try {

        const data = await PropertyModel.find({ userid: req.params.id });
        data != 0 ? res.status(200).json(data) : res.status(404).json("no listing found");


    } catch (error) {
        console.log(error)
        res.status(500).json("error occured")
    }
}
const userproductListing = async (req, res) => {
    try {

        const data = await ProductModel.find({ userid: req.params.id });
        data != 0 ? res.status(200).json(data) : res.status(404).json("no listing found");


    } catch (error) {
        console.log(error)
        res.status(500).json("error occured")
    }
}


const deleteproduct= async(req,res)=>
    {
        try {
           const {userid}=req.body;
           const product= await ProductModel.findById(req.params.id)
        if (!product) {
            res.status(404).json("no product found")
        }

        if (userid != product.userid) {
            res.status(403).json("You can only delete the listing created by you")
        }
        await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).json("product deleted successfully");
 
        } catch (error) {
            console.log(error)
        res.status(500).json("error occured")
        }
    }

const deleteListing = async (req, res) => {
    try {
        const { userid } = req.body;
        const property = await PropertyModel.findById(req.params.id)
        if (!property) {
            res.status(404).json("no property found")
        }

        if (userid != property.userid) {
            res.status(403).json("You can only delete the listing created by you")
        }
        await PropertyModel.findByIdAndDelete(req.params.id);
        res.status(200).json("property deleted successfully");


    } catch (error) {
        console.log(error)
        res.status(500).json("error occured")
    }
}
const updateListing = async (req, res) => {
    try {
        const { userid } = req.headers;
        const id = req.params.id
        const property = await PropertyModel.findById(req.params.id)
        if (!property) {
            res.status(404).json("no property found")
        }

        if (userid != property.userid) {
            res.status(403).json("You can only delete the listing created by you")
        }
        const updatedData = await PropertyModel.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedData);


    } catch (error) {
        console.log(error)
        res.status(500).json("error occured")
    }
}


const updateProduct=async(req,res)=>{
    try {
        const { userid } = req.headers;
        const id = req.params.id
        const property = await ProductModel.findById(req.params.id)
        if (!property) {
            res.status(404).json("no property found")
        }

        if (userid != property.userid) {
            res.status(403).json("You can only update the listing created by you")
        }
        const updatedData = await ProductModel.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedData);


    } catch (error) {
        console.log(error)
        res.status(500).json("error occured")
    }
}
const getUserListing = async (req, res) => {
    const{id}=req.params;
    const listing = await PropertyModel.findById(id);

    listing ? res.status(200).json(listing) : res.status(404).json("no listing found");

}
const searchListing = async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const searchRegex = new RegExp(searchTerm,'i');
        const results = await PropertyModel.find({propname:searchRegex});

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const purchasedListing=async(req,res)=>
{
    try {
       const{id}=req.params;
       const listing= await PurchaseModel.find({userId:id}).populate("propertyId")
       if(!listing)
       {
        res.status(404).json("No Listing Found");
       }
       const propertyData = listing.map((listing) => listing.propertyId);
       res.status(201).json(propertyData)
    } catch (error) {
        res.status(500).json({message:"internla server error"})
    }
}



module.exports = {
    createListing,
    getListing,
    userListing,
    deleteListing,
    updateListing,
    getUserListing,
    searchListing,
    purchasedListing,
    productListing,
    getproductlisting,
    getuserproductlisting,
    getbycategory,
    userproductListing,
    updateProduct,
    deleteproduct
}