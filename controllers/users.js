const JWT = require('jsonwebtoken');
const User = require('../models/user');
const userServices = require('../services/user');
const Group = require('../models/group');
const {JWT_SECRET}= require('../config');
const authorization= require('../helpers/authorization');
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
        const firstName = req.value.body.firstname;
        const lastName = req.value.body.lastname;
        const foundUser = await User.findOne({email: email});
        if(foundUser){
           return res.status(403).send({error:'Email already exist'});
        }
        const newUser = new User({
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName
        })
       newUser.save();
       defaultGroup = 'users';
       newUser.addUserToGroup(newUser._id,defaultGroup);
        const token = signToken(newUser);
        res.cookie('jwt',token);
        res.redirect('/panel/dashboard');
    },
    
    signIn: async (req,res, next) =>{
        const token = signToken(req.user); 
        const foundUser = User.findOne({id: req.user._id});
        if(!foundUser){
            res.status(403).send({error:'User is not exist'});
            }
        const user = new User();
        var userGroup = await user.getUserGroup(req.user._id);
        res.cookie('jwt',token);

        if(userGroup.indexOf('admins')!=-1){
            res.redirect('/panel/dashboard');                
        }
        else{
            res.redirect('/panel/dashboard');   
        }      
     
    },
    signOut: async (req,res, next) =>{

        const foundUser = User.findOne({id: req.user._id});
        if(!foundUser){
            res.status(403).send({error:'User is not exist'});
            }
        res.clearCookie('jwt');
        res.redirect('/users/signin');  
     
    },
    signInGet: async (req,res, next) =>{
        if(authorization.cookieTokenExtractor(req)){
            res.redirect('/panel/dashboard'); 
        }
        else{
            var message = req.flash('message')[0];
            res.render('signin-signup',{message: message});
        }
        
    },

    secret: async (req,res, next) =>{

        res.status(200).send({secret:'I managed to get here'});
        
    },
    editUser: async (req, res, next) => {
        var user =  await User.findOne({_id: req.user._id});
        var updateUserError = req.flash('updateUserError')[0];
        var updateUserPasswordError = req.flash('updateUserPasswordError')[0]; 
        res.render('user',{user: user,updateUserError: updateUserError,updateUserPasswordError: updateUserPasswordError, active:'none'});
    },
    updateUser: async (req, res, next) => {

        const foundUser = await User.findOne({_id: req.user._id});
        if(!foundUser){
            res.status(403).send({error:'User is not exist'});
            }

        foundUser.firstName = req.value.body.firstname;
        foundUser.lastName = req.value.body.lastname;
        foundUser.email = req.value.body.email;
        if(await userServices.updateUser(foundUser)){
            res.redirect('/users/edituser/');

        }
        else{

            req.flash('updateUserError','Error updating your user.');
            res.redirect('/users/edituser/');
        }
        
    },
    updateUserPassword: async (req, res, next) => {

        const foundUser = await User.findOne({_id: req.user._id});
        if(!foundUser){
            res.status(403).send({error:'User is not exist'});
            }
        let oldPassword = req.value.body.oldPassword;
        let newPassword = req.value.body.password;

        if(await foundUser.isValidPassword(oldPassword)){  
            foundUser.password = req.value.body.password;
            if(await userServices.updateUserPassword(foundUser)){
                res.redirect('/users/edituser/');
    
            }
            else{
    
                req.flash('updateUserPasswordError','Error updating your user password.');
                res.redirect('/users/edituser/');
            }
        }
        else{
            req.flash('updateUserPasswordError','Old Password is incorrect!');
            res.redirect('/users/edituser/');
        }
        
        
    },
    makeAdmin: async (req, res, next) => {
        const userID = req.value.body.id;
        if(await userServices.makeAdmin(userID)){
            res.redirect('/groups/getgroups/');
        }
        else{
            req.flash('errorMsg','Error adding your user');
            res.redirect('/groups/getgroups/');
        }
    },
    removeAdmin: async (req, res, next) => {
        const userID = req.value.body.id;
        if(await userServices.removeAdmin(userID)){
            res.redirect('/groups/getgroups/');
        }
        else{
            req.flash('errorMsg','Error removing your user');
            res.redirect('/groups/getgroups/');
        }
    },
    removeUser: async (req, res, next) =>{
        const userID = req.value.body.id;
        if(await userServices.removeUser(userID)){
            res.redirect('/groups/getgroups/');
        }
        else{
            req.flash('errorMsg','Error removing your user');
            res.redirect('/groups/getgroups/');
        }
    }

};