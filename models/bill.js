const mysqlCred = require('../config/index').mysqlCred;
const mysql = require('mysql');
const mysqlBackbone = require('mysql-backbone');
const ItemModel = require('../models/item');
const customerModel = require('../models/customer');

 const connection = mysql.createConnection({
  host     : 'localhost',
  user     : mysqlCred.mysqlUser,
  password : mysqlCred.mysqlPass,
  database : mysqlCred.mysqlDB,
});

connection.connect();
const Bill =  mysqlBackbone.Model.extend({connection: connection, tableName: "bill"});
const Bills = mysqlBackbone.Collection.extend({ model: Bill, connection: connection, tableName: "bill"});
const bills = new Bills();

const BilledItem =  mysqlBackbone.Model.extend({connection: connection, tableName: "billed_item"});
const BilledItems = mysqlBackbone.Collection.extend({ model: BilledItem, connection: connection, tableName: "billed_item"});
const billedItems = new BilledItems();

const Item =  mysqlBackbone.Model.extend({connection: connection, tableName: "item"});

module.exports={
  placeOrder: async function (newBill, userId){
    
    if(newBill && userId){
      let guestCustomer = JSON.parse(JSON.stringify(await customerModel.getCustomerByName('guest')));
      let guestCustomerId = guestCustomer[0].id;
      var bill = {
        customerId:newBill.customerId > 0 ? newBill.customerId:guestCustomerId,
        PaymentId:newBill.paymentId,
        voucherId:newBill.voucherId ? newBill.voucherId:null,
        amount:newBill.totalAmount,
        tax:newBill.taxpercentage ? newBill.taxpercentage:null,
        taxAmount:newBill.taxAmount ? newBill.taxAmount:null,
        finalAmount:newBill.finalTotalAmount,
        createdBy:userId,
        updatedBy:userId
      };
      
      var query = connection.query('INSERT INTO bill SET ?', bill,
      async function(err, result) {
        if(result){
        var billId = result.insertId;
        if(billId){
          var billedItem;
          var item;
          for(var i =0;i<newBill.itemId.length;i++){
            billedItem = new BilledItem({
              billId: billId,
              itemId:parseInt(newBill.itemId[i], 10),
              itemPrice:parseFloat(newBill.itemFinalPrice[i]),
              quantity:parseInt(newBill.ItemQuantity[i], 10)
            });
            billedItem.save();
            var itemBeforeUpdate = await ItemModel.getItem(parseInt(newBill.itemId[i], 10));
            var oldItemQuantity = itemBeforeUpdate[0].quantity;
            item = new Item({
              quantity: oldItemQuantity - parseInt(newBill.ItemQuantity[i], 10)
            });
            item.save(parseInt(newBill.itemId[i], 10));
          }
        }
        else{
          return false;
        }
        }
      });
      
      return true;
    }

    else{
      return false;
    }
    
  },
  getBill: async function (id=null){
    var result;
    if(id){
        await  bills.fetch( {where: "id=" +id}).then(function(rows) {
            if (rows){
                result = rows;
                return rows;
            }
            return null;
        });
        
    }
    else{
        
        await bills.fetch().then(function(rows) {
            if (rows){
                result = rows;
                return rows;
            }
            return null;
        });
    }
    return result;
  },
  getBilledItem: async function (id=null, billId=null){
    var result;
    if(id){
        await  billedItems.fetch( {where: "id=" +id}).then(function(rows) {
            if (rows){
                result = rows;
                return rows;
            }
            return null;
        });
        
    }
    else if(billId){
      await  billedItems.fetch( {where: "billId=" +billId}).then(function(rows) {
          if (rows){
              result = rows;
              return rows;
          }
          return null;
      });
      
    }
    else{
        
        await billedItems.fetch().then(function(rows) {
            if (rows){
                result = rows;
                return rows;
            }
            return null;
        });
    }
    return result;
  },
  removeBill: async function (billId){
    let billedItemsToBeRemoved = await this.getBilledItem(null,billId);
    if(billedItemsToBeRemoved){
      billedItemsToBeRemoved = JSON.parse(JSON.stringify(billedItemsToBeRemoved));
      for(var i = 0;i<billedItemsToBeRemoved.length;i++){
        var itemBeforeUpdate = await ItemModel.getItem(billedItemsToBeRemoved[i].itemId);
    
        if(itemBeforeUpdate[0]){
          var oldItemQuantity = itemBeforeUpdate[0].quantity;
       
          var itemAfterUpdate = new Item({
            quantity: oldItemQuantity + billedItemsToBeRemoved[i].quantity
          });
         
          try{
            itemAfterUpdate.save(billedItemsToBeRemoved[i].itemId);
          }catch{
            return false;
          }
        }
      }
         
      var query = connection.query('DELETE from billed_item WHERE billId = ?', billId,
      async function(err, result) {
        if(err){
          return false;
        }

      });
      var billToBeRemoved = new Bill();
        try{
          billToBeRemoved.destroy(billId);
            return true;
        }catch{
            return false;
        }
    }
    else{
      return false;
    }
    
   
  },
  removeBilledItem: async  function(removeBilledItemReq){
    var billedItemBool;
    var itemBool;
    var billBool;

    let billedItemBeforeUpdate =  await this.getBilledItem(parseInt(removeBilledItemReq.billedItemId, 10),null);
    if(billedItemBeforeUpdate){
      billedItemBeforeUpdate = JSON.parse(JSON.stringify(billedItemBeforeUpdate));
      billedItemBeforeUpdate = billedItemBeforeUpdate[0];
      if((billedItemBeforeUpdate.quantity - 1) === 0){
        let billedItemAfterUpdate = new BilledItem();
        try{
          billedItemAfterUpdate.destroy(parseInt(removeBilledItemReq.billedItemId, 10));
          billedItemBool = true;
        }catch{
            return false;
        }
      }
      else{
        let billedItemAfterUpdate = new BilledItem({
          quantity: billedItemBeforeUpdate.quantity - 1
        });
        try{
        billedItemAfterUpdate.save(parseInt(removeBilledItemReq.billedItemId, 10));
        billedItemBool = true;
        }catch{
          return false;
        }
      }
    }
    else{
      return false;
    }


    let itemBeforeUpdate = await ItemModel.getItem(parseInt(removeBilledItemReq.itemId, 10));
    if(itemBeforeUpdate){
      itemBeforeUpdate = JSON.parse(JSON.stringify(itemBeforeUpdate));
      itemBeforeUpdate = itemBeforeUpdate[0];
      let itemAfterUpdate = new Item({
        quantity: itemBeforeUpdate.quantity + 1
      });
      try{
        itemAfterUpdate.save(parseInt(removeBilledItemReq.itemId, 10));
        itemBool = true;
      }catch{
        return false;
      }
    }
    else{
      return false;
    }

    let billBeforeUpdate = await this.getBill(parseInt(removeBilledItemReq.billId, 10));
    if(billBeforeUpdate){
      let billedItemsToBeRemoved = await this.getBilledItem(null,parseInt(removeBilledItemReq.billId, 10));
      
      if(billedItemsToBeRemoved.length>0){
        console.log(billedItemsToBeRemoved);
        billBeforeUpdate = JSON.parse(JSON.stringify(billBeforeUpdate));
        billBeforeUpdate = billBeforeUpdate[0];
        console.log(billBeforeUpdate);
        let billAfterUpdate = new Bill({
          amount: billBeforeUpdate.amount - parseFloat(removeBilledItemReq.itemAmount),
          taxAmount: billBeforeUpdate.taxAmount - parseFloat(removeBilledItemReq.itemTaxAmount),
          finalAmount: billBeforeUpdate.finalAmount - parseFloat(removeBilledItemReq.itemFinalAmount)
        });
        try{
          billAfterUpdate.save(parseInt(removeBilledItemReq.billId, 10));
          billBool = true;
        }catch{
          return false;
        }
        
      }
      else{
        console.log('bill removed');
        let billToBeRemoved = new Bill();
        try{
          billToBeRemoved.destroy(parseInt(removeBilledItemReq.billId, 10));
          billBool = true;
        }catch{
            return false;
        }
      }
      
    }
    else{
      return false;
    }

    if(billedItemBool && itemBool && billBool){
      return true;
    }
   
  },
  getLastAddedBillId: async function(){
    var result;
    await  bills.fetch({fields: ['id']}).then(function(rows) {
      if (rows){
          console.log()
          result = rows[rows.length -1];
          return result;
      }
      return null;
    });
    return JSON.parse(JSON.stringify(result));
  },

  checkBillItemsQuantity: async function(bill){
    for(var i =0;i<bill.itemId.length;i++){
      var item = await ItemModel.getItem(parseInt(bill.itemId[i], 10));
      item = JSON.parse(JSON.stringify(item));
      item = item[0];
      var indices = [];
      for(var j =0;j<bill.itemId.length;j++){
        bill.itemId[j] = parseInt(bill.itemId[j], 10);
      }
      for(var j =0;j<bill.itemId.length;j++){

        indices.push(bill.itemId.indexOf(item.id,j));
      }
      let totalItemQuantity = 0;
      for(var j =0;j<indices.length;j++){
        totalItemQuantity +=  parseInt(bill.ItemQuantity[j], 10)
      }
      
      if(item.quantity < totalItemQuantity){
        return false;
      }
    }
    return true;
  }
}