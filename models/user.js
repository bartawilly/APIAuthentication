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
    }
});

userSchema.pre('save', async function (next) {
   try{
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    const groupName=  await Group.findOne({name: 'users'});
    groupName.members.push(this._id);
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
        groupName.members.push(userId);
        await groupName.save();
       } catch (error){
        throw new Error(error);
       }
}
userSchema.methods.removeUserFromGroup = async function (userId) {
    try{
        const groupName=  await getUserGroup(userId);
        groupName.members.pull(userId);
        await groupName.save();

       } catch (error){
        throw new Error(error);
       }
}
userSchema.methods.getUserGroup = async function (userId) {
    try{
        let groupName;
        let groups = await Group.find({});
        if(groups && groups.length>0){
            let group = groups.find((g)=>{
                return g.members.indexOf(userId)!=-1
            });
            if(group) {
            groupName = group.name;
            }
        }
        

        return groupName;
    
    }catch(error){
        throw new Error(error);
    }
    
       
}
// Create Model

const User = mongoose.model('user', userSchema)

//Export the model

module.exports = User;