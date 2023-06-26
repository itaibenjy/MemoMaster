// Import the User model and the jsonwebtoken library
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Function to create a JWT token with the user's ID
function createToken(_id){
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Function to log in a user
async function loginUser(req, res){
    const { username, password } = req.body;

    try {
        // Try to log in the user with the given username and password
        const user = await User.login(username, password);

        // Create a JWT token with the user's ID
        const token = createToken(user._id);

        // Combine the user's first and last name
        const name = user.firstName + " " + user.lastName;

        // Send a response with the username, token, and name
        res.status(200).json({ username, token , name});

    }catch(err){
        // If there's an error, send a response with the error message
        res.status(400).json({ error: err.message });
    }
};


// Function to sign up a user
async function signupUser(req, res){
    const { username, password, firstName, lastName, email } = req.body;

    try{
        // Try to sign up the user with the given information
        const user = await User.signup(username, password, firstName, lastName, email);

        // Create a JWT token with the user's ID
        const token = createToken(user._id);

        // Combine the user's first and last name
        const name = user.firstName + " " + user.lastName;

        // Send a response with the username, token, and name
        res.status(201).json({ username, token, name });

    } catch(err){
        // If there's an error, send a response with the error message
        console.log(err)
        res.status(400).json({ error: err.message });
    }
}

// Export the loginUser and signupUser functions
module.exports = {
    loginUser,
    signupUser,
};