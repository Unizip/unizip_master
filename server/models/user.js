
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// create schema
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    status: String,
    bio: String,
    subjects: Array,
    dob: Date,
    isValidated: {
        type: Boolean,
        default: false
    }
})

// insert function to occur before a specific action
userSchema.pre('save', async function(next) {
    // we don't use an async function, because we need to use this. 
    // this would refer to the outside scope
    /// Generate a password hash
    try {
        // generate a salt
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        //- re-assign hashed password 
        this.password = passwordHash;
        next(); // on you go!
    } catch(error) {
        next(error)
    }
})


userSchema.methods.isValidPassword = async function(passwordFromClientTryingToLogIn){
    try {
        return await bcrypt.compare(passwordFromClientTryingToLogIn, this.password); // returns a boolean
    } catch(error){
        // we don't use next because we don't have access to it
        throw new Error(error);
    }
}

// create model
const User = mongoose.model('user', userSchema);

// export the model
module.exports = { User };
