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
const Customer =  mysqlBackbone.Model.extend({connection: connection, tableName: "customer"});
const Customers = mysqlBackbone.Collection.extend({ model: Customer, connection: connection, tableName: "customer"});
const customers = new Customers();

module.exports={
    getCustomer: async function (id=null){
        var result;
        if(id){
            await  customers.fetch( {where: "id=" +id}).then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
            
        }
        else{
            
            await customers.fetch().then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
        }
        return result;
    },
    saveCustomer: async function (cus, userId, id=null){
        
        
        if(id){
            try{
                customer = new Customer({
                    name:cus.name,
                    mobile:cus.mobile,
                    updatedBy:userId
                });
                customer.save(id); 
                return true;
            }catch{
                return false;
            }
            
        }else{
            try{
                customer = new Customer({
                    name:cus.name,
                    mobile:cus.mobile,
                    createdBy:userId,
                    updatedBy:userId
                });
                customer.save(); 
                return true;
            }catch{
                return false;
            }
        }
        
    },
    removeCustomer: async (customerId) =>{
        customer = new Customer();
        try{
            customer.destroy(customerId);
            return true;
        }catch{
            return false;
        }
    },
    getCustomerCustom: async function (id=null){
        var result;
        if(id){
            await  customers.fetch( {fields: ['id','name', 'mobile'], where: "id=" +id}).then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
            
        }
        else{
            
            await customers.fetch({fields: ['id','name', 'mobile']}).then(function(rows) {
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