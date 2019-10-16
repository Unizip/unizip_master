var express = require('express');
const router = require('express-promise-router')();
const routeHelpers = require('../helpers/routeHelpers');
const usersController = require('../controllers/users');
const passport = require('passport');
const passportConf = require('../passport');

/**
 * 
*/

const { validateBody, schemas} = routeHelpers;


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route('/signup')
// usersController.signup gets called after next() in the validateBody function
    .post(validateBody(schemas.authSchema), usersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.loginSchema), passport.authenticate('local', {session: false}), usersController.signIn);

//> we'll only have access to this route if we have a token
router.route('/secret')
    .get(passport.authenticate('jwt', {
        session: false
    }), usersController.secret);

router.route('/confirmation/:token')
    .get(usersController.confirmation)


/**
 * 
*/

// router.route('/confirmation')
//     .post(usersController.confirmationPost)

// router.route('/resend')
//     .post(usersController.resendTokenPost)

module.exports = router;
