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
const Item =  mysqlBackbone.Model.extend({connection: connection, tableName: "item"});
const Items = mysqlBackbone.Collection.extend({ model: Item, connection: connection, tableName: "item"});
const items = new Items();

module.exports={
    getItem: async function (id=null){
        var result;
        if(id){
            await  items.fetch( {where: "id=" +id}).then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
            
        }
        else{
            
            await items.fetch().then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
        }
        return result;
    },
    saveItem: async function (itm, id=null){
        item = new Item({
            code: itm.code,
            name: itm.name,
            cost: itm.cost,
            price: itm.price,
            discount: itm.discount,
            finalPrice: itm.price - itm.discount,
            quantity: itm.quantity,
            providerId: itm.providerId,
            categoryId: itm.categoryId
        });
        if(id){
            try{
                item.save(id); 
                return true;
            }catch{
                return false;
            }
            
        }else{
            try{
                item.save(); 
                return true;
            }catch{
                return false;
            }
        }
        
    },
    updateItemQuantity: async function (itm){
        let sameItem = await this.getItem(itm.itemId);
        let oldQuantity = sameItem[0].quantity;
        item = new Item({
            quantity: itm.quantity + oldQuantity
        });

        try{
            item.save(itm.itemId); 
            return true;
        }catch{
            return false;
        }
       
        
    },
    removeItem: async (itemId) =>{
        item = new Item();
        try{
            item.destroy(itemId);
            return true;
        }catch{
            return false;
        }
    },
    getItemCustom: async function (id=null){
        var result;
        if(id){
            await  items.fetch( {fields: ['id','code', 'quantity', 'finalPrice'], where: "id=" +id}).then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
            
        }
        else{
            
            await items.fetch({fields: ['id','code', 'quantity', 'finalPrice']}).then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
        }
        return result;
    },
    getReorderItems: async function (threshold) {
        var result;
        if(threshold){
            await items.fetch({fields: ['code', 'name', 'cost', 'quantity','providerId'], where:'quantity < '+threshold}).then(function(rows) {
                if (rows){
                    result = JSON.parse(JSON.stringify(rows));
                }
                return null;
            });
        }
        return result;
    }
}