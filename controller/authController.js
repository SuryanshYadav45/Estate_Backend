const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var admin = require("firebase-admin");

var serviceAccount = require("../firebase_credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const signup = async (req, res) => {
  try {
    const{username,email,password}=req.body;
    console.log(req.body);
    const user= await UserModel.find({email});
    if(user)
    {
      return res.status(409).json({message:"user already exists"});
    }
    const hashpassword = await bcrypt.hash(password,12);
    const response = await UserModel.create({
      username,
      email,
      password: hashpassword
    })
    console.log(response);
    if(!response)
    {
      res.status(500).json(error.message)
    }
    
    res.status(201).json({message:"User created successfully "});


  } catch (error) {
    console.log(error);
    res.status(500).json(error.message)
  }
}

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json("User not found");
    }

    const validUser = await bcrypt.compare(password, user.password);

    if (validUser) {
      const token = jwt.sign(
        { id: user._id, username: user.username, photoUrl: user.photoUrl, email: user.email },
        process.env.TOKEN_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token });
    } else {
      res.status(401).json("Incorrect password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const googleSignin = async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify the Google Sign-In token using Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    // Check if the user with this googleId already exists in your database
    let user = await UserModel.findOne({ googleId: uid });

    if (!user) {
      // If the user doesn't exist, create a new user with Google information
      user = await UserModel.create({
        username: decodedToken.name,
        email: decodedToken.email,
        googleId: uid,
        photoUrl: decodedToken.picture
      });
    }
    const token = jwt.sign({ id: user._id, username: user.username,photoUrl:user.photoUrl,email:user.email  }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



module.exports = {
  signup,
  signin,
  googleSignin
}