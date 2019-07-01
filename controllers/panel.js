const Report = require('../models/report');
const Item = require('../models/item');
const Provider = require('../models/provider');


module.exports={
    dashboard: async (req,res, next)=>{
        
        let report = await Report.getReport(null,null,true);
        let reorderItems = await Item.getReorderItems(5);
        
        var reorderItemsProviders = [];
        for(var i=0;i<reorderItems.length;i++){
            reorderItemsProviders[i]= (JSON.parse(JSON.stringify(await Provider.getProvider(reorderItems[i].providerId))))[0];
        }
        console.log(reorderItems);
        console.log(reorderItemsProviders);
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('dashboard',{active:'dashboard', errorMsg:errorMsg, report:report, reorderItems:reorderItems, reorderItemsProviders:reorderItemsProviders });
    }
};