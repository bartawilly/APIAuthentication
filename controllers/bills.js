const Bill = require('../models/bill');
const Item = require('../models/item');
const Customer = require('../models/customer');
const Payment = require('../models/payment');
const Voucher = require('../models/voucher');
module.exports={
    newBill: async (req,res, next)=>{
        const items = await Item.getItemCustom();
        const customers = await Customer.getCustomerCustom();
        const payments = await Payment.getPaymentCustom();
        const vouchers =  await Voucher.getVoucherCustom();
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('newBill',{active: 'newBill', errorMsg:errorMsg, items:items, customers:customers, payments:payments, vouchers:vouchers});
    },
    previewBill: async (req,res, next)=>{   
        let bill = req.value.body;
        console.log(bill);
    }
}