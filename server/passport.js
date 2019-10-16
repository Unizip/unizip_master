const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { User } = require("./models/user");
//> the local strategy is for using the jwt on the client
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

/**
 * > Passport decodes the JWT for us.
 * > The user signs up, and sends back details
 * > The server then creates a token, with a secret
 * > the token is sent to the browser
 * > That token is then constantly sent whenever a new asset is requested from the server.
 * - passport, used here, is what will be checking the token each time it's sent back to the server
 */

// == JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        // Find the user specified in the token
        // payload refers to the jwt object returned in controllers
        const user = await User.findById(payload.sub);
        // if user doesn't exist, handle
        if (!user) {
          // we didn't find the user.
          return done(null, false);
        }
        // otherwise return the user. ->
        // done(errors, return val)
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

//  === ANCHOR Passport local strategy
passport.use(
  new LocalStrategy(
    {
      // assumes you want to use username and password, so we have to specify email
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        // check if user exists
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false);
        }
        // check if password is correct
        const isMatch = await user.isValidPassword(password);
        const isValid = user.isValidated;

        if (!isMatch) return done(null, false);

        // ! REVIEW does this work? is this the right way to check? 
        if (!isValid) return done("user not validated!", false)

        //> otherwise you're done
        done(null, user);
        // return user
      } catch (error) {
          done(error, false);
      }
    }
  )
);
