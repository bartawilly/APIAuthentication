const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const customerController = require('../controllers/customers');
const passportConfig = require('../passport');

const passport = require('passport');


router.route('/getcustomers')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), customerController.getCustomers);
    
router.route('/savecustomer')
    .post(validateBody(schemas.customerSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), customerController.saveCustomer);
    
router.route('/removecustomer')
    .post(validateBody(schemas.removeCustomerSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), customerController.removeCustomer);


module.exports = router;