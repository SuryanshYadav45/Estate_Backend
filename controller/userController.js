const UserModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');



const getUser=async(req,res)=>{
res.status(200).send("getuser api is working")
};


const updateUser=async(req,res)=>{

    const{username,email,photourl}=req.body;
    const user= await UserModel.findOne({_id:req.params.id})
    if(!user){
        res.status(404).send("user not found")
    }
    else{
        user.username=username?username:user.username;
        user.photoUrl=photourl?photourl:user.photoUrl;
        user.email=email?email:user.email;

        const updateduser= await user.save();
        if(updateUser){
        const token= jwt.sign({ id: user._id, username: user.username ,photoUrl:user.photoUrl,email:user.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.status(200).json({token});
        }
        else{
        res.status(500).json("Server Error");
        }
    }


};

const deleteUser=async(req,res)=>{
    try {
       await UserModel.findByIdAndDelete(req.params.id) 
       res.status(200).json({message:"user deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({Error:"error occured"})
    }
}

module.exports={
    getUser,
    updateUser,
    deleteUser
}