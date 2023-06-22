const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// The User schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
   }
}, { timestamps: true })


// static signup method
userSchema.statics.signup = async function(username, password, firstName, lastName, email) {

    // validate the data
    if (!username || !password || !firstName || !lastName || !email) {
        throw new Error('All fields are required');
    }
    if (!validator.isEmail(email)) {
        throw new Error('Email is invalid');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('Password must be strong');
    }

    // check if username or email already exists
    const exists = await this.findOne({ $or: [{ username }, { email }] });
    if (exists) throw new Error('Email or username already exists');

    // adding some random text to the password to make it more secure if two users have the same password
    const salt = await bcrypt.genSalt(); 
    const hash = await bcrypt.hash(password, salt); // hash the password

    // creating the user and saving it to the database
    const user = await this.create({ username, password: hash, firstName, lastName, email });
    return user;
}

// static login method
userSchema.statics.login = async function(username, password) {

    // validate the data
    if(!username || !password){
        throw new Error('Username and password are required');
    }

    // check if the user exists
    const user = await this.findOne({ username });
    if (!user) throw new Error('Username does not exist');

    // compare the passwords
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) throw new Error('Password is incorrect');

    return user;
}


const User = mongoose.model('User', userSchema);
module.exports = User;