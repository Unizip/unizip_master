const { User } = require("../models/user");
const JWT = require('jsonwebtoken');
require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const tokenContents = (user) => {
      return {
    iss: 'Didactic',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }
}

signInToken = (user) => {
    return JWT.sign(tokenContents(user), process.env.JWT_SECRET);
  }

emailSignUpToken = async (user) => {
    return JWT.sign(tokenContents(user), process.env.EMAIL_SECRET, {}, (err, emailToken) => {
        const url = `http://localhost:2000/users/confirmation/${emailToken}`;

        transporter.sendMail({
            to: user.email,
            subject: "Confirm email",
            html: `Please click this email to confirm your mail: <a href="${url}>${url}</a>"`
        })

    })
}

module.exports = {
  signUp: async (req, res, next) => {
    

    /**
     * 1. Check if user with the email exists
     * 2. Create new user
     * 3. Respond with token
     */
    const {firstName,
        lastName,
        subjects,
        status,
        bio,
        dob,
        email,
        password} = req.value.body;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
        return res.status(403).json({ msg: "That email is already used by another account." });
    }
      

    const newUser = new User({
      firstName,
      lastName,
      subjects,
      status,
      bio,
      dob,
      email,
      password,
      isValidated: false
    });

    await newUser.save();


    // .sign(payload, secret) - returns a token
    const token = emailSignUpToken(newUser);

  },
  signIn: async (req, res, next) => {
    const token = signInToken(req.user)
    res.status(200).json({ token });
  },
  secret: async (req, res, next) => {
    console.log("I managed to get here!");
  },
  confirmation: async function(req, res, next) {
        try {
            const { sub: id } = JWT.verify(req.params.token, process.env.EMAIL_SECRET);
            await User.findOneAndUpdate({ _id: id }, { isValidated: true });
            res.send("done");
        } catch(error){
            console.log(error)
        }
    }
};

