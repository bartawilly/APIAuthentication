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
const Category =  mysqlBackbone.Model.extend({connection: connection, tableName: "category"});
const Categories = mysqlBackbone.Collection.extend({ model: Category, connection: connection, tableName: "category"});
const categories = new Categories();

module.exports={
    getCategory: async function (id=null){
        var result;
        if(id){
            await  categories.fetch( {where: "id=" +id}).then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
            
        }
        else{
            
            await categories.fetch().then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
        }
        return result;
    },
    saveCategory: async function (cat, id=null){
        category = new Category({
            name:cat.name
        });
        if(id){
            try{
                category.save(id); 
                return true;
            }catch{
                return false;
            }
            
        }else{
            try{
                category.save(); 
                return true;
            }catch{
                return false;
            }
        }
        
    },
    removeCategory: async (categoryId) =>{
        category = new Category();
        try{
            category.destroy(categoryId);
            return true;
        }catch{
            return false;
        }
    }
}