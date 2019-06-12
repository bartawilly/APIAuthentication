const Item = require('../models/item');
const Provider = require('../models/provider');
const Category = require('../models/category');
module.exports={
    getItems: async (req,res, next)=>{
        const items = await Item.getItem();
        const providers = await Provider.getProvider();
        const categories = await Category.getCategory();
        let itemProviders = [];
        let itemCategories = [];
        for(var i=0;i<items.length;i++){
            if(await Provider.getProvider(items[i].providerId)){
                let sameItemProvider = await Provider.getProvider(items[i].providerId);
                itemProviders[i] = sameItemProvider[0];
            }
            if(await Category.getCategory(items[i].categoryId)){
                let sameItemCategory = await Category.getCategory(items[i].categoryId);
                itemCategories[i]= sameItemCategory[0];
            }
        }
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('item',{active: 'items', errorMsg:errorMsg, items: items, providers:providers, categories:categories, itemProviders:itemProviders, itemCategories:itemCategories});
    },
    saveItem: async (req,res, next)=>{
        let item = req.value.body;
        if(item.id){
            if(await Item.saveItem(item, item.id)){
                res.redirect('/items/getitems/');
            }
            else{
                req.flash('errorMsg','Error saving Item');
                res.redirect('/items/getitems/');
            }
        }
        else{
            if(await Item.saveItem(item)){
                res.redirect('/items/getitems/');
            }
            else{
                req.flash('errorMsg','Error saving Item');
                res.redirect('/items/getitems/');
            }
        }
        
    },
    updateItemQuantity: async (req,res, next)=>{

        let item = req.value.body;
        if(await Item.updateItemQuantity(item)){
            res.redirect('/items/getitems/');
        }
        else{
            req.flash('errorMsg','Error saving Item');
            res.redirect('/items/getitems/');
        }

        
    },
    removeItem: async (req, res, next)=>{
        let itemId = req.value.body.id;
        if(await Item.removeItem(itemId)){
            res.redirect('/items/getitems/');
        }
        else{
            req.flash('errorMsg','Error removing Item');
            res.redirect('/items/getitems/');
        }

    }
}