const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const categoryController = require('../controllers/categories');
const passportConfig = require('../passport');

const passport = require('passport');


router.route('/getcategories')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), categoryController.getCategories);
    
router.route('/savecategory')
    .post(validateBody(schemas.categorySchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), categoryController.saveCategory);
    
router.route('/removecategory')
    .post(validateBody(schemas.removeCategorySchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), categoryController.removeCategory);


module.exports = router;