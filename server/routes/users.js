var express = require('express');
const router = require('express-promise-router')();

const usersController = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/signup')
    .post(usersController.signUp);

router.route('/signin')
    .post(usersController.signIn);

router.route('/secret')
    .get(usersController.secret);

module.exports = router;
