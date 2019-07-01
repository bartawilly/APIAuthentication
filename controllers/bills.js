const Bill = require('../models/bill');
const Item = require('../models/item');
const Customer = require('../models/customer');
const Payment = require('../models/payment');
const Voucher = require('../models/voucher');
const UserServices = require('../services/user');
const moment = require('moment');
module.exports={
    newBill: async (req,res, next)=>{
        const items = await Item.getItemCustom();
        const customers = await Customer.getCustomerCustom();
        const payments = await Payment.getPaymentCustom();
        const vouchers =  await Voucher.getVoucherCustom();
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('newBill',{active: 'newBill', errorMsg:errorMsg, items:items, customers:customers, payments:payments, vouchers:vouchers});
    },
    placeOrder: async (req,res, next)=>{   
        let bill = req.value.body;
        if(await Bill.checkBillItemsQuantity(bill)){
            if (await Bill.placeOrder(bill, req.user._id)){
                let billId = await Bill.getLastAddedBillId();
                billId = billId.id;
                res.redirect('/bills/printbill/?billId='+billId);
            }
            else{
                req.flash('errorMsg','Error placing your order!');
                res.redirect('/bills/newBill/');
            }
        }
        else{
            req.flash('errorMsg','Error please check your items quantities!');
            res.redirect('/bills/newBill/');
        }
        
    },
    getBills: async (req,res, next)=>{
        const bills = await Bill.getBill();
        let creators = [];
        let updaters = [];
        let customers = [];
        let payments = [];
        let vouchers = [];
        for(var i=0;i<bills.length;i++){
            if(bills[i].createdBy){
                creators[i]= await UserServices.getUser(bills[i].createdBy);
                creators[i] = creators[i].firstName + ' ' + creators[i].lastName;
            }
            if( bills[i].updatedBy){
                updaters[i]= await UserServices.getUser(bills[i].updatedBy);
                updaters[i] = updaters[i].firstName + ' ' + updaters[i].lastName;
            }
            if(bills[i].customerId){
                
                customers[i]= await Customer.getCustomer(bills[i].customerId);
                if(customers[i][0]){
                    customers[i] = JSON.parse(JSON.stringify(customers[i]));
                    customers[i] = customers[i][0].name;
                    
                }
                else{
                    customers[i] = 'guest';
                }
                
            }
            if( bills[i].paymentId){
                payments[i]= await Payment.getPayment(bills[i].paymentId);
                payments[i] = JSON.parse(JSON.stringify(payments[i]));
                payments[i] = payments[i][0].type;
            }
            if( bills[i].voucherId){
                vouchers[i]= await Voucher.getVoucher(bills[i].voucherId);
                vouchers[i] = JSON.parse(JSON.stringify(vouchers[i]));
                vouchers[i] = vouchers[i][0].text;
            }
        }
        
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('bills',{active: 'bills', errorMsg:errorMsg, bills: bills, customers:customers, payments:payments,vouchers:vouchers, creators:creators,updaters:updaters});
    },
    removeBill: async (req, res, next)=>{
        let billId = req.value.body.id;
        if(await Bill.removeBill(billId)){
            res.redirect('/bills/getbills/');
        }
        else{
            req.flash('errorMsg','Error removing Bill');
            res.redirect('/bills/getbills/');
        }

    },
    returnBilledItem: async(req, res, next) =>{
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('returnItem',{active: 'returnItem', errorMsg:errorMsg});
    },
    getBilledItems: async (req, res, next) =>{
        var billId;
        if(req.query.billId){
            billId = req.query.billId;
        }  
        var billedItems;
        var bill;
        if(billId){
            billedItems = await Bill.getBilledItem(null, billId);
            bill =await Bill.getBill(billId);
        }
        if(bill && billedItems.length > 0){
            let billedItemsObj = JSON.parse(JSON.stringify(billedItems));
            let billObj = JSON.parse(JSON.stringify(bill));
            var item;
            var itemObj;
            var voucher;
            var voucherObj;
            var voucherPercentage;
            let billedItemsIds = [];
            let itemIds= [];
            let itemCodes = [];
            let itemNames = [];
            let itemAmounts = [];
            let voucherText;
            let taxPercentage;
            let itemTaxAmounts = [];
            let itemFinalAmounts = [];
            if(billObj[0].voucherId){
               voucher = await Voucher.getVoucher(billObj[0].voucherId);
               voucherObj =  JSON.parse(JSON.stringify(voucher));
               voucherText = voucherObj[0].text;
               voucherPercentage = voucherObj[0].percentage;
            }
            if(billObj[0].tax){
                taxPercentage = billObj[0].tax;
            }
            
            let count = 0;
            for(var i=0;i<billedItems.length;i++){
                billedItemsIds [i] = billedItemsObj[i].id;
                if(await Item.getItem(billedItems[i].itemId)){
                    item = await Item.getItem(billedItems[i].itemId);
                    itemObj = JSON.parse(JSON.stringify(item));
                    let j = 0;
                    while(j<billedItemsObj[i].quantity){
                        billedItemsIds [count] = billedItemsObj[i].id;
                        itemIds[count] = itemObj[0].id;
                        itemCodes[count] = itemObj[0].code;
                        itemNames[count] = itemObj[0].name;
                        itemAmounts[count] = billedItemsObj[i].itemPrice;
                        itemTaxAmounts[count] = taxPercentage ? taxPercentage*itemAmounts[count]/100 : 0;
                        itemFinalAmounts [count] = voucherPercentage ? (voucherPercentage*itemAmounts[count]/100) + itemTaxAmounts[count]: itemAmounts[count] + itemTaxAmounts[count];
                        count ++;
                        j++;
                    }
                    
                }
            }
            var errorMsg = req.flash('errorMsg')[0]; 
            res.render('returnItem',{active: 'returnItem', errorMsg:errorMsg, billId:billId, billedItemsIds:billedItemsIds,
            itemIds:itemIds, itemCodes:itemCodes, itemNames:itemNames,itemAmounts:itemAmounts,voucherText:voucherText,taxPercentage:taxPercentage,
            itemTaxAmounts:itemTaxAmounts, itemFinalAmounts:itemFinalAmounts});
        }
        else{
            req.flash('errorMsg','Error with your bill ID');
            res.redirect('/bills/returnbilleditem/');
        }
    },
        
    removeBilledItem: async(req, res, next) =>{
        let removeBilledItemReq = req.value.body;
        if(await Bill.removeBilledItem(removeBilledItemReq)){
            res.redirect('/bills/getbilleditems/?billId='+removeBilledItemReq.billId);
        }
        else{
            req.flash('errorMsg','Error removing the billed item');
            res.redirect('/bills/getbilleditems/?billId='+removeBilledItemReq.billId);
        }

    },
    printBill: async (req, res, next) =>{
        let billId = req.query.billId;
        var billedItems;
        var bill;
        if(billId){
            billedItems = await Bill.getBilledItem(null, billId);
            bill =await Bill.getBill(billId);
        }
        if(bill && billedItems.length > 0){
            let billedItemsObj = JSON.parse(JSON.stringify(billedItems));
            let billObj = JSON.parse(JSON.stringify(bill));

            let billedItemsQuantity = [];
            let billedItemsAmount = [];

            var item;
            var itemObj;
            let itemCodes = [];
            let itemNames = [];
            let itemPrices = [];
            
            var voucherText;
            var customerName;
            var taxPercentage;
            var taxAmount;
            var amount;
            var finalAmount;
            var paymentType;
            var orderedAt;
            var cachierName;

            for(var i=0;i<billedItems.length;i++){
                if(await Item.getItem(billedItems[i].itemId)){
                    item = await Item.getItem(billedItems[i].itemId);
                    itemObj = JSON.parse(JSON.stringify(item));
                        itemCodes[i] = itemObj[0].code;
                        itemNames[i] = itemObj[0].name;
                        itemPrices[i] = billedItemsObj[i].itemPrice;
                        billedItemsQuantity[i] = billedItemsObj[i].quantity;
                      
                        billedItemsAmount[i] = itemPrices[i] * billedItemsQuantity[i];
                }
            }
            if(billObj[0].voucherId){
                var voucher,voucherObj;
                voucher = await Voucher.getVoucher(billObj[0].voucherId);
                voucherObj =  JSON.parse(JSON.stringify(voucher));
                voucherText = voucherObj[0].text;
            }
            if(billObj[0].customerId){
                var customer,customerObj;
                customer = await Customer.getCustomer(billObj[0].customerId);
                customerObj =  JSON.parse(JSON.stringify(customer));
                customerName = customerObj[0].name;
            }
            if(billObj[0].paymentId){
                var payment,paymentObj;
                payment = await Payment.getPayment(billObj[0].paymentId);
                paymentObj =  JSON.parse(JSON.stringify(payment));
                paymentType = paymentObj[0].type;
            }
            if(billObj[0].createdBy){
                cachierName= await UserServices.getUser(billObj[0].createdBy);
                cachierName = cachierName.firstName + ' ' + cachierName.lastName;
            }
            if(billObj[0].tax){
                taxPercentage = billObj[0].tax;
            }

            if(billObj[0].taxAmount){
                taxAmount = billObj[0].taxAmount;
            }
            if(billObj[0].amount){
                amount = billObj[0].amount;
            }
            if(billObj[0].finalAmount){
                finalAmount = billObj[0].finalAmount;
            }
            if(billObj[0].createdAt){
                orderedAt = billObj[0].createdAt;
            }
            var errorMsg = req.flash('errorMsg')[0]; 
            res.render('printBill',{active:'none', errorMsg:errorMsg, billId:billId, customerName:customerName, cachierName:cachierName, 
                paymentType:paymentType, orderedAt:orderedAt, itemCodes:itemCodes, itemNames:itemNames, itemPrices:itemPrices,
                billedItemsQuantity:billedItemsQuantity, billedItemsAmount:billedItemsAmount, amount:amount, taxPercentage:taxPercentage,
                taxAmount:taxAmount, voucherText:voucherText, finalAmount:finalAmount });
        }else{
            req.flash('errorMsg','Error with your bill ID');
            res.redirect('/bills/getbills/');
        }
        
    }
}