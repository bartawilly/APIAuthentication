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
const Voucher =  mysqlBackbone.Model.extend({connection: connection, tableName: "voucher"});
const Vouchers = mysqlBackbone.Collection.extend({ model: Voucher, connection: connection, tableName: "voucher"});
const vouchers = new Vouchers();

module.exports={
    getVoucher: async function (id=null){
        var result;
        if(id){
            await  vouchers.fetch( {where: "id=" +id}).then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
            
        }
        else{
            
            await vouchers.fetch().then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
        }
        return result;
    },
    saveVoucher: async function (vou, id=null){
        voucher = new Voucher({
            text: vou.text,
            percentage: vou.percentage,
            startAt: vou.startAt,
            expireAt: vou.expireAt
        });
        if(id){
            try{
                voucher.save(id); 
                return true;
            }catch{
                return false;
            }
            
        }else{
            try{
                voucher.save(); 
                return true;
            }catch{
                return false;
            }
        }
        
    },
    removeVoucher: async (voucherId) =>{
        voucher = new Voucher();
        try{
            voucher.destroy(voucherId);
            return true;
        }catch{
            return false;
        }
    },
    getVoucherCustom: async function (id=null){
        var result;
        if(id){
            await  vouchers.fetch( {fields:['id', 'text','startAt', 'expireAt','percentage'],where: "id=" +id}).then(function(rows) {
                if (rows){
                    result = rows;
                    return rows;
                }
                return null;
            });
            
        }
        else{
            
            await vouchers.fetch({fields:['id', 'text','startAt', 'expireAt','percentage']}).then(function(rows) {
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