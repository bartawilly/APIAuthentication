const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const voucherController = require('../controllers/vouchers');
const passportConfig = require('../passport');

const passport = require('passport');


router.route('/getvouchers')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), voucherController.getVouchers);
    
router.route('/savevoucher')
    .post(validateBody(schemas.voucherSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), voucherController.saveVoucher);
    
router.route('/removevoucher')
    .post(validateBody(schemas.removeVoucherSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), voucherController.removeVoucher);


module.exports = router;