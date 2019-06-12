const Payment = require('../models/payment');
module.exports={
    getPayments: async (req,res, next)=>{
        const payments = await Payment.getPayment();
        
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('payment',{active: 'payments', errorMsg:errorMsg, payments: payments});
    },
    savePayment: async (req,res, next)=>{
        let payment = req.value.body;
        if(payment.id){
            if(await Payment.savePayment(payment, payment.id)){
                res.redirect('/payments/getpayments/');
            }
            else{
                req.flash('errorMsg','Error saving Payment');
                res.redirect('/payments/getpayments/');
            }
        }
        else{
            if(await Payment.savePayment(payment)){
                res.redirect('/payments/getpayments/');
            }
            else{
                req.flash('errorMsg','Error saving Payment');
                res.redirect('/payments/getpayments/');
            }
        }
        
    },
    removePayment: async (req, res, next)=>{
        let paymentId = req.value.body.id;
        if(await Payment.removePayment(paymentId)){
            res.redirect('/payments/getpayments/');
        }
        else{
            req.flash('errorMsg','Error removing Payment');
            res.redirect('/payments/getpayments/');
        }

    }
}