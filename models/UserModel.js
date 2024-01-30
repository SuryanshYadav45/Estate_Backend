const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }, googleId: {
        type: String
    },
    photoUrl:{
        type:String,
        default:'https://imgs.search.brave.com/07-jioEUUCOU6rDsw4zPH6qgHC_OUgVQGGlvPcNlsyY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzE0LzE4LzQ2/LzM2MF9GXzUxNDE4/NDY1MV9XNXJWQ2Fi/S0tSSDZIM21WYjYy/allXZnVYaW84Yzhz/aS5qcGc',
    }
}, {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;