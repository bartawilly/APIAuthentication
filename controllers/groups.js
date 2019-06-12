const Group = require('../models/group');
const groupServices = require('../services/group');
module.exports={
    addGroup: async (req,res, next)=>{

        const name = req.value.body.name;
        if(await groupServices.addGroup(name)){
            res.redirect('/groups/getgroups/');
        }else{
            req.flash('errorMsg','Error adding group');
            res.redirect('/groups/getgroups/');
        }

    },
    removeGroup: async (req,res, next)=>{

        const name = req.value.body.name;
        if(await groupServices.removeGroup(name)){
            res.redirect('/groups/getgroups/');
        }else{
            req.flash('errorMsg','Error removing group');
            res.redirect('/groups/getgroups/');
        }

    },
    getGroups: async (req,res, next)=>{
        var groups = await groupServices.getGroup();
        var groupsUsers = await groupServices.getGroupUsers();
        var errorMsg = req.flash('errorMsg')[0]; 
        res.render('groups-users',{active: 'groups', groups: groups, errorMsg: errorMsg, groupsUsers: groupsUsers});
    }
    
};
