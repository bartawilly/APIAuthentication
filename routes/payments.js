const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const paymentController = require('../controllers/payments');
const passportConfig = require('../passport');

const passport = require('passport');


router.route('/getpayments')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), paymentController.getPayments);
    
router.route('/savepayment')
    .post(validateBody(schemas.paymentSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), paymentController.savePayment);
    
router.route('/removepayment')
    .post(validateBody(schemas.removePaymentSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), paymentController.removePayment);


module.exports = router;