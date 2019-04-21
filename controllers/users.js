const JWT = require('jsonwebtoken');
const User = require('../models/user');
const Group = require('../models/group');
const {JWT_SECRET}= require('../config');
signToken = user =>{
    return JWT.sign({
        iss: 'meshyat',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    },JWT_SECRET);
}
module.exports={
    signUp: async (req,res, next)=>{
        
        
        const email = req.value.body.email;
        const password = req.value.body.password;
        const foundUser = await User.findOne({email: email});
        if(foundUser){
           return res.status(403).send({error:'Email already exist'});
        }
        const newUser = new User({
            email:email,
            password:password
        })
       newUser.save();
       defaultGroup = 'users';
       newUser.addUserToGroup(newUser._id,defaultGroup);
        const token = signToken(newUser);
      res.status(200).json({token: token});
    },
    
    signIn: async (req,res, next) =>{
        const token = signToken(req.user); 
        const foundUser = User.findOne({id: req.user._id});
        if(!foundUser){
            res.status(403).send({error:'User is not exist'});
            }
        const user = new User();
        var userGroup = await user.getUserGroup(req.user._id);
        
        if(userGroup==='admins'){
            res.status(200).send({success:"you are admin", token:token});                }
        else{
            res.status(200).send({success:"you are normal user", token:token}); 
        }      
     
    },

    secret: async (req,res, next) =>{

        console.log('I managed to get here');
        
    },
    addUserToGroup: async (req,res, next)=>{
        
        
        const name = req.value.body.name;
        const email = req.value.body.email;
        const foundUser = await User.findOne({email: email});
        const foundGroup = await Group.findOne({name: name});
        if(!foundUser){
           return res.status(403).send({error:'User is not exist'});
        }

        if(!foundGroup){
            return res.status(403).send({error:'Group is not exist'});
         }
        if(await foundUser.getUserGroup(foundUser._id)){
            await User.removeUserFromGroup(foundUser._id);
        }
        await foundUser.addUserToGroup(foundUser.id,foundGroup.name);
        res.status(200).send({success:"User has been added! to the group!"});
    }
};