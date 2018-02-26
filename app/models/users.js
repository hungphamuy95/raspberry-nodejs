const mongoose = require('mongoose');
const shema= mongoose.Schema;

var userSchemas = new shema({
    name:{type:String, required: true},
    password:{type: String, required: true},
    payload: Boolean,
    meta:{age:Number, website: String},
    createAt:String,
    updateAt:String
});

module.exports=mongoose.model('User', userSchemas);