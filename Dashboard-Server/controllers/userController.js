const User = require('../models/User');
const jwt = require('jsonwebtoken');

//create a jwt token
function createToken(_id){
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

async function loginUser(req, res){
    const { username, password } = req.body;

    try {
        // try to login the user
        const user = await User.login(username, password);

        // create a token
        const token = createToken(user._id);

        const name = user.firstName + " " + user.lastName;

        res.status(200).json({ username, token , name});

    }catch(err){
        res.status(400).json({ error: err.message });
    }
};


// signup user
async function signupUser(req, res){
    const { username, password, firstName, lastName, email } = req.body;

    try{
        // try to signup the user
        const user = await User.signup(username, password, firstName, lastName, email);

        // create a token
        const token = createToken(user._id);

        const name = user.firstName + " " + user.lastName;

        res.status(201).json({ username, token, name });

    } catch(err){
        console.log(err)
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    loginUser,
    signupUser,
};