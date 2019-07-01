const Report = require('../models/report');
module.exports={
    getReports: async (req,res, next)=>{
        var report;
        if(Object.keys(req.query).length !== 0){
            report = await Report.getReport(req.query.startAt,req.query.endAt);
            
        }
        else{
            report = await Report.getReport();
        }
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('report',{active: 'report', errorMsg:errorMsg, report:report});
    }
}