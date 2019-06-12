module.exports={
    dashboard: async (req,res, next)=>{
        res.render('dashboard',{user:req.user, active:'dashboard'});
    }
};