const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const expenseController = require('../controllers/expenses');
const passportConfig = require('../passport');

const passport = require('passport');


router.route('/getexpenses')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), expenseController.getExpenses);
    
router.route('/saveexpense')
    .post(validateBody(schemas.expenseSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), expenseController.saveExpense);
    
router.route('/removeexpense')
    .post(validateBody(schemas.removeExpenseSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), expenseController.removeExpense);


module.exports = router;