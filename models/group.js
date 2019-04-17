const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const groupSchema=new Schema({
    name:{
        type: String,
        unique: true,
        lowercase:true
    },
    members:[{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
});

// Create Model

const Group = mongoose.model('group', groupSchema)

//Export the model

module.exports = Group;