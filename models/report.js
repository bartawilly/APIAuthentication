const mysqlCred = require('../config/index').mysqlCred;
const mysqlBackbone = require('mysql-backbone');
const moment = require('moment');

var mysql=require("mysql").createPool({
    host:'localhost', user: mysqlCred.mysqlUser, password: mysqlCred.mysqlPass, database: mysqlCred.mysqlDB
   ,useConnectionPooling:true//allow parallel querying!
   ,connectionLimit:16
   ,connectTimeout:15*60*1000
})
var db=require("dbq")(
    mysql,{//pass in node-mysql pool initialized above, then an options {}
    //option:[default]
    verbose:true// console.log queries as they happen?
    ,log:(query,rows,queryLine,took,db)=>{//maybe you want to customize how queries are logged
    console.log(`query in ${took}s:`,query.sql)
    }
});


module.exports={
    getReport: async function (fromDate=null, toDate=null, daily=false){
        var report={};
        if(fromDate && toDate){
            await db("select SUM(amount) as totalExpenses from expense where createdAt BETWEEN ? and ?",[fromDate, toDate]).then(([rows])=>{
                
                report.totalExpenses = JSON.parse(JSON.stringify(rows)).totalExpenses;
            });
            await db("select SUM(finalAmount) as totalFinalAmounts from bill where createdAt BETWEEN ? and ?",[fromDate, toDate]).then(([rows])=>{
                report.totalFinalAmounts = JSON.parse(JSON.stringify(rows)).totalFinalAmounts;
            });
        }else if(daily){
            let today = '%'+moment().format('YYYY-MM-DD')+'%';
            await db("select SUM(amount) as totalExpenses from expense where createdAt LIKE ? ",[today]).then(([rows])=>{
                
                report.totalExpenses = JSON.parse(JSON.stringify(rows)).totalExpenses;
            });
            await db("select SUM(finalAmount) as totalFinalAmounts from bill where createdAt LIKE ? ",[today]).then(([rows])=>{
                report.totalFinalAmounts = JSON.parse(JSON.stringify(rows)).totalFinalAmounts;
            });
        }
        else{
            await db("select SUM(amount) as totalExpenses from expense").then(([rows])=>{
                report.totalExpenses = JSON.parse(JSON.stringify(rows)).totalExpenses;
            });
            await db("select SUM(finalAmount) as totalFinalAmounts from bill").then(([rows])=>{
                report.totalFinalAmounts = JSON.parse(JSON.stringify(rows)).totalFinalAmounts;
            });
            
        }
        report.netRevenue = report.totalFinalAmounts - report.totalExpenses;
        return report;

    }
}