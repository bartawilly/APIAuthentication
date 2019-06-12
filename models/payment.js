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
const Payment =  mysqlBackbone.Model.extend({connection: connection, tableName: "payment"});
const Payments = mysqlBackbone.Collection.extend({ model: Payment, connection: connection, tableName: "payment"});
const payments = new Payments();

module.exports={
    getPayment: async function (id=null){
        var result;
        if(id){
            await  payments.fetch( {where: "id=" +id}).then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
            
        }
        else{
            
            await payments.fetch().then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
        }
        return result;
    },
    savePayment: async function (pay, id=null){
        payment = new Payment({
            type: pay.type
        });
        if(id){
            try{
                payment.save(id); 
                return true;
            }catch{
                return false;
            }
            
        }else{
            try{
                payment.save(); 
                return true;
            }catch{
                return false;
            }
        }
        
    },
    removePayment: async (paymentId) =>{
        payment = new Payment();
        try{
            payment.destroy(paymentId);
            return true;
        }catch{
            return false;
        }
    },
    getPaymentCustom: async function (id=null){
        var result;
        if(id){
            await  payments.fetch( {fields:['id', 'type'],where: "id=" +id}).then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
            
        }
        else{
            
            await payments.fetch({fields:['id', 'type']}).then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
        }
        return result;
    }
}