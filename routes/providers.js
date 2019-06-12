const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const providerController = require('../controllers/providers');
const passportConfig = require('../passport');

const passport = require('passport');


router.route('/getproviders')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), providerController.getProviders);
    
router.route('/saveprovider')
    .post(validateBody(schemas.providerSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), providerController.saveProvider);
    
router.route('/removeprovider')
    .post(validateBody(schemas.removeProviderSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), providerController.removeProvider);


module.exports = router;