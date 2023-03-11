const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const us = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
        token: {
            type: String,
            required: true     
        }
    }
    ]
})

//for hashing the password using salt

us.pre("save", async function (next) {
    console.log("hello from inside");
    if (this.isModified("password")) {
        console.log(`current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
        console.log(`current password is ${this.password}`);
    }
    next();
})

//generating auth token
us.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.secret_key);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    } catch(err) {
        console.log(err);
    }
}

const User = mongoose.model('USER', us);

module.exports = User;