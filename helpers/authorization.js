const User = require('../models/user');
const Group = require('../models/group');
const {JWT_SECRET} = require('../config');
const jwt = require('jsonwebtoken');




module.exports={
   /* JWTAdminAuthorization:  function (){
        return async (req, res, next) =>{
            try{
                if (req && req.cookies) token = req.cookies['jwt'];
                token = jwt.decode(token);
                const foundUser = User.findOne({id: token.sub});
                if(!foundUser){
                 res.status(403).send({error:'User is not exist'});
                 }
                const user = new User();
                
                if(await user.isAdmin(token.sub)){
                    next();
                }
                else{
                 res.status(403).send({error:'You have no access to this page'});
                }
            }catch(err){
               return next(err);
            }
        }
       
    },*/
    cookieTokenExtractor : function(req) {
        var token = null;
        if (req && req.cookies) token = req.cookies['jwt'];
        return token;
      }
};