const User = require('../models/user');
const Group = require('../models/group');
const {JWT_SECRET} = require('../config');
const jwt = require('jsonwebtoken');




module.exports={
    JWTAdminAuthorization:  function (){
        return async (req, res, next) =>{
            try{
                var token = req.headers['authorization'];
                token = jwt.decode(token);
                const foundUser = User.findOne({id: token.sub});
                if(!foundUser){
                 res.status(403).send({error:'User is not exist'});
                 }
                const user = new User();
                var userGroup = await user.getUserGroup(token.sub);
                
                if(userGroup==='admins'){
                    next();
                }
                else{
                 res.status(403).send({error:'You have no access to this page'});
                }
            }catch(err){
               return next(err);
            }
        }
       
    }
};