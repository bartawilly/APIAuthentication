const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const itemController = require('../controllers/items');
const passportConfig = require('../passport');

const passport = require('passport');


router.route('/getitems')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), itemController.getItems);
    
router.route('/saveitem')
    .post(validateBody(schemas.itemSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), itemController.saveItem);

router.route('/updateitemquantity')
    .post(validateBody(schemas.updateItemQuantitySchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), itemController.updateItemQuantity);

router.route('/removeitem')
    .post(validateBody(schemas.removeItemSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), itemController.removeItem);


module.exports = router;