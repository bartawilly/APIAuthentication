const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const billController = require('../controllers/bills');
const passportConfig = require('../passport');

const passport = require('passport');


router.route('/newbill')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), billController.newBill);
    
router.route('/placeorder')
    .post(validateBody(schemas.placeOrderSchema),passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), billController.placeOrder);

router.route('/getbills')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), billController.getBills);

router.route('/removebill')
    .post(validateBody(schemas.removeBillSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), billController.removeBill);

router.route('/returnbilleditem')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), billController.returnBilledItem);

router.route('/getbilleditems')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), billController.getBilledItems);

router.route('/removebilleditem')
    .post(validateBody(schemas.removeBilledItemSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), billController.removeBilledItem);

router.route('/printbill')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), billController.printBill);

module.exports = router;