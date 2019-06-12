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
const Provider =  mysqlBackbone.Model.extend({connection: connection, tableName: "provider"});
const Providers = mysqlBackbone.Collection.extend({ model: Provider, connection: connection, tableName: "provider"});
const providers = new Providers();

module.exports={
    getProvider: async function (id=null){
        var result;
        if(id){
            await  providers.fetch( {where: "id=" +id}).then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
            
        }
        else{
            
            await providers.fetch().then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
        }
        return result;
    },
    saveProvider: async function (prov, id=null){
        provider = new Provider({
            name:prov.name,
            address:prov.address,
            phone:prov.phone,
            email:prov.email
        });
        if(id){
            try{
                provider.save(id); 
                return true;
            }catch{
                return false;
            }
            
        }else{
            try{
                provider.save(); 
                return true;
            }catch{
                return false;
            }
        }
        
    },
    removeProvider: async (providerId) =>{
        provider = new Provider();
        try{
            provider.destroy(providerId);
            return true;
        }catch{
            return false;
        }
    }
}