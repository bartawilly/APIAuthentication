const Customer = require('../models/customer');
const UserServices = require('../services/user');
module.exports={
    getCustomers: async (req,res, next)=>{
        const customers = await Customer.getCustomer();
        let creators = [];
        let updaters = [];
        for(var i=0;i<customers.length;i++){
            if(await UserServices.getUser(customers[i].createdBy)){
                creators[i]= await UserServices.getUser(customers[i].createdBy);
                creators[i] = creators[i].firstName + ' ' + creators[i].lastName;
            }
            if( await UserServices.getUser(customers[i].updatedBy)){
                updaters[i]= await UserServices.getUser(customers[i].updatedBy);
                updaters[i] = updaters[i].firstName + ' ' + updaters[i].lastName;
            }
        }
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('customer',{active: 'customers', errorMsg:errorMsg, customers: customers, creators: creators, updaters: updaters});
    },
    saveCustomer: async (req,res, next)=>{
        let customer = req.value.body;
        if(customer.id){
            if(await Customer.saveCustomer(customer,req.user._id,customer.id)){
                res.redirect('/customers/getcustomers/');
            }
            else{
                req.flash('errorMsg','Error saving Customer');
                res.redirect('/customers/getcustomers/');
            }
        }
        else{
            if(await Customer.saveCustomer(customer, req.user._id)){
                res.redirect('/customers/getcustomers/');
            }
            else{
                req.flash('errorMsg','Error saving Customer');
                res.redirect('/customers/getcustomers/');
            }
        }
        
    },
    removeCustomer: async (req, res, next)=>{
        let customerId = req.value.body.id;
        if(await Customer.removeCustomer(customerId)){
            res.redirect('/customers/getcustomers/');
        }
        else{
            req.flash('errorMsg','Error removing Customer');
            res.redirect('/customers/getcustomers/');
        }

    }
}