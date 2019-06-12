const Expense = require('../models/expense');
module.exports={
    getExpenses: async (req,res, next)=>{
        const expenses = await Expense.getExpense();
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('expense',{active: 'expenses', errorMsg:errorMsg, expenses: expenses});
    },
    saveExpense: async (req,res, next)=>{
        let expense = req.value.body;
        if(expense.id){
            if(await Expense.saveExpense(expense, expense.id)){
                res.redirect('/expenses/getexpenses/');
            }
            else{
                req.flash('errorMsg','Error saving Expense');
                res.redirect('/expenses/getexpenses/');
            }
        }
        else{
            if(await Expense.saveExpense(expense)){
                res.redirect('/expenses/getexpenses/');
            }
            else{
                req.flash('errorMsg','Error saving Expense');
                res.redirect('/expenses/getexpenses/');
            }
        }
        
    },
    removeExpense: async (req, res, next)=>{
        let expenseId = req.value.body.id;
        if(await Expense.removeExpense(expenseId)){
            res.redirect('/expenses/getexpenses/');
        }
        else{
            req.flash('errorMsg','Error removing Expense');
            res.redirect('/expenses/getexpenses/');
        }

    }
}