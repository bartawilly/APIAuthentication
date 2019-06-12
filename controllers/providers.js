const Provider = require('../models/provider');
module.exports={
    getProviders: async (req,res, next)=>{
        const providers = await Provider.getProvider();
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('provider',{active: 'providers', errorMsg:errorMsg, providers: providers});
    },
    saveProvider: async (req,res, next)=>{
        let provider = req.value.body;
        if(provider.id){
            if(await Provider.saveProvider(provider,provider.id)){
                res.redirect('/providers/getproviders/');
            }
            else{
                req.flash('errorMsg','Error saving provider');
                res.redirect('/providers/getproviders/');
            }
        }
        else{
            if(await Provider.saveProvider(provider)){
                res.redirect('/providers/getproviders/');
            }
            else{
                req.flash('errorMsg','Error saving provider');
                res.redirect('/providers/getproviders/');
            }
        }
        
    },
    removeProvider: async (req, res, next)=>{
        let providerId = req.value.body.id;
        if(await Provider.removeProvider(providerId)){
            res.redirect('/providers/getproviders/');
        }
        else{
            req.flash('errorMsg','Error removing provider');
                res.redirect('/providers/getproviders/');
        }

    }
}