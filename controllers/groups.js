const Group = require('../models/group');

module.exports={
    addGroup: async (req,res, next)=>{

        const name = req.value.body.name;
        const foundGroup = await Group.findOne({name: name});
        if(foundGroup){
           return res.status(403).send({error:'Email already exist'});
        }
        const newGroup = new Group({
            name:name
        })
        newGroup.save();
        res.status(200).send({success:"group has been added!"});
    }
};
