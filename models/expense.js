const mysqlCred = require('../config/index').mysqlCred;
const mysql = require('mysql');
const mysqlBackbone = require('mysql-backbone');

 const connection = mysql.createConnection({
  host     : 'localhost',
  user     : mysqlCred.mysqlUser,
  password : mysqlCred.mysqlPass,
  database : mysqlCred.mysqlDB,
});

connection.connect();
const Expense =  mysqlBackbone.Model.extend({connection: connection, tableName: "expense"});
const Expenses = mysqlBackbone.Collection.extend({ model: Expense, connection: connection, tableName: "expense"});
const expenses = new Expenses();

module.exports={
    getExpense: async function (id=null){
        var result;
        if(id){
            await  expenses.fetch( {where: "id=" +id}).then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
            
        }
        else{
            
            await expenses.fetch().then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
        }
        return result;
    },
    saveExpense: async function (exp, id=null){
        expense = new Expense({
            name:exp.name,
            amount:exp.amount
        });
        if(id){
            try{
                expense.save(id); 
                return true;
            }catch{
                return false;
            }
            
        }else{
            try{
                expense.save(); 
                return true;
            }catch{
                return false;
            }
        }
        
    },
    removeExpense: async (expenseId) =>{
        expense = new Expense();
        try{
            expense.destroy(expenseId);
            return true;
        }catch{
            return false;
        }
    }
}