const User = require('../models/user');
const Group = require('../models/group');
const bcrypt = require('bcryptjs');
module.exports = {
    updateUser : async function (user) {

      return User.findOneAndUpdate({_id: user.id}, {$set:{firstName:user.firstName, lastName:user.lastName, email:user.email}}, (err) => {
                if (err) {
                    return false;
                }
                return true;
                
            });
         

        },
    updateUserPassword : async function (user) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(user.password, salt);
        return  User.findOneAndUpdate({_id: user.id}, {$set:{password:passwordHash}}, (err) => {
            if (err) {
                return false;
            }
            
            return true;
            
        });


        },
    getUser: async function (id=null){
        if(id){
            var foundUser = User.findOne({_id:id});
            if (foundUser){
                return foundUser;
            }
            return null;
        }
        else{
            var foundUser = User.find({});
            if (foundUser){
                return foundUser;
            }
            return null;
        }
    },
    makeAdmin: async function (id) {
        var foundUser = await User.findOne({_id:id});
        if (foundUser){
        var foundGroup = await Group.findOne({name:'admins'});
        if(foundGroup){
            var user = new User();
            return await user.addUserToGroup(foundUser._id, foundGroup.name);
           
        }
        }
        return false;
    },
    removeAdmin: async function (id) {
        var foundUser = await User.findOne({_id:id});
        if (foundUser){
        var foundGroup = await Group.findOne({name:'admins'});
        if(foundGroup){
            var user = new User();
            return await user.removeUserFromGroup(foundUser._id, foundGroup.name);
            
        }
        }
        return false;
    },
    removeUser: async function (userId){
        const foundUser = await User.findOne({_id: userId});
        if(foundUser){
            await User.findOneAndRemove({_id: userId});
            const user = new User();
            var userGroupsNames = await user.getUserGroup(userId);
            console.log(userGroupsNames);
            userGroupsNames.forEach(async(name)=>{
                
                foundGroup = await Group.findOne({name:name});
                if(foundGroup){
                    foundGroup.members.pull(userId);
                    foundGroup.save();
                }
            });
            return true;
        }
        return false;
    }
}