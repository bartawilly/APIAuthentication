const Voucher = require('../models/voucher');
module.exports={
    getVouchers: async (req,res, next)=>{
        const vouchers = await Voucher.getVoucher();
        
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('voucher',{active: 'vouchers', errorMsg:errorMsg, vouchers: vouchers});
    },
    saveVoucher: async (req,res, next)=>{
        let voucher = req.value.body;
        if(voucher.id){
            if(await Voucher.saveVoucher(voucher, voucher.id)){
                res.redirect('/vouchers/getvouchers/');
            }
            else{
                req.flash('errorMsg','Error saving Voucher');
                res.redirect('/vouchers/getvouchers/');
            }
        }
        else{
            if(await Voucher.saveVoucher(voucher)){
                res.redirect('/vouchers/getvouchers/');
            }
            else{
                req.flash('errorMsg','Error saving Voucher');
                res.redirect('/vouchers/getvouchers/');
            }
        }
        
    },
    removeVoucher: async (req, res, next)=>{
        let voucherId = req.value.body.id;
        if(await Voucher.removeVoucher(voucherId)){
            res.redirect('/vouchers/getvouchers/');
        }
        else{
            req.flash('errorMsg','Error removing Voucher');
            res.redirect('/vouchers/getvouchers/');
        }

    }
}