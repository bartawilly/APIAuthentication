const mongoose = require('mongoose');
const Group = require('./group');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create Schema
const userSchema=new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    }

});

userSchema.pre('save', async function (next) {
   try{
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
   } catch (error){
    next(error);
   }
});


userSchema.methods.isValidPassword = async function (newPassword) {
    try{
      return await bcrypt.compare(newPassword, this.password);
    }catch (error){
        throw new Error(error);
    }
}


userSchema.methods.addUserToGroup = async function (userId, group) {
    try{
        const groupName=  await Group.findOne({name: group});
        if(groupName){
            if(groupName.members.indexOf(userId) == -1){
                groupName.members.push(userId);
                await groupName.save();
                return true;
            }
        }
        return false;
       } catch (error){
        throw new Error(error);
       }
}
userSchema.methods.removeUserFromGroup = async function (userId, groupName) {
    try{
        const foundGroup=  await Group.findOne({name: groupName});
        const foundUser=  await User.findOne({_id: userId});
        if(foundGroup && foundUser){
            
            foundGroup.members.pull(userId);
            await foundGroup.save();
            return true;
        }
        return false;

       } catch (error){
        throw new Error(error);
       }
}
userSchema.methods.isAdmin = async function (userId) {
    try{
        const foundGroup=  await Group.findOne({name: 'admins'});
        const foundUser=  await User.findOne({_id: userId});
        if(foundGroup && foundUser){

            if(foundGroup.members.indexOf(userId)!=-1){

                return true;
            }
             
        }
        return false;

       } catch (error){
        throw new Error(error);
       }
}
userSchema.methods.getUserGroup = async function (userId) {
    try{
        
        let groups = await Group.find({});
        if(groups && groups.length>0){
            let userGroups=[];
           groups.forEach((g)=>{
            if(g.members.indexOf(userId) != -1){
                userGroups.push(g.name);
            }
           });
           return userGroups;
        }
    
    }catch(error){
        throw new Error(error);
    }
       
}

// Create Model

const User = mongoose.model('user', userSchema)

//Export the model

module.exports = User;