const Category = require('../models/category');
module.exports={
    getCategories: async (req,res, next)=>{
        const categories = await Category.getCategory();
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('category',{active: 'categories', errorMsg:errorMsg, categories: categories});
    },
    saveCategory: async (req,res, next)=>{
        let category = req.value.body;
        if(category.id){
            if(await Category.saveCategory(category,category.id)){
                res.redirect('/categories/getcategories/');
            }
            else{
                req.flash('errorMsg','Error saving Category');
                res.redirect('/categories/getcategories/');
            }
        }
        else{
            if(await Category.saveCategory(category)){
                res.redirect('/categories/getcategories/');
            }
            else{
                req.flash('errorMsg','Error saving category');
                res.redirect('/categories/getcategories/');
            }
        }
        
    },
    removeCategory: async (req, res, next)=>{
        let categoryId = req.value.body.id;
        if(await Category.removeCategory(categoryId)){
            res.redirect('/categories/getcategories/');
        }
        else{
            req.flash('errorMsg','Error removing Category');
            res.redirect('/categories/getcategories/');
        }

    }
}