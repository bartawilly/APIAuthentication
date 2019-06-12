const Group = require('../models/group');
const User = require('../models/user');
module.exports={
    getGroup: async function (id=null){
        if(id){
            var foundGroup = Group.find({_id:id});
            if (foundGroup){
                return foundGroup;
            }
            return null;
        }
        else{
            var foundGroup = Group.find({});
            if (foundGroup){
                return foundGroup;
            }
            return null;
        }
    },
    getGroupUsers: async function (id=null){
        if(id){
            var groupMembers = await Group.find({_id:id}).members;
            if (groupMembers){
                var groupUsers = [];
                for(var i=0;i<groupMembers.length;i++){
                    groupUsers[i] = User.findOne({_id:groupMembers[i]});
                }
                return groupUsers;
            }
            return null;
        }
        else{
            var groups = await Group.find({});

            if (groups){
                var groupUsers = [];
                for(var i = 0;i<groups.length;i++){
                    var groupMembers = groups[i].members;
                    groupUsers[i]=[];
                    for(var j = 0;j<groupMembers.length;j++){
                        groupUsers[i][j]=await User.findOne({_id:groupMembers[j]});
                    }
                }
                return groupUsers;
            }
            return null;
        }
    },
    addGroup: async function (groupName){
        const foundGroup = await Group.findOne({name: groupName});
        if(!foundGroup){
            const newGroup = new Group({
                name:groupName
            });
            await newGroup.save();
            return true;
        }
        return false;

    },
    removeGroup: async function (groupName){
        const foundGroup = await Group.findOne({name: groupName});
        if(foundGroup){
            await Group.findOneAndRemove({name: groupName});
            return true;
        }
        return false;
    }

};