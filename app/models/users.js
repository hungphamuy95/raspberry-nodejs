const mongoose = require('mongoose');
const shema= mongoose.Schema;

const userSchemas = new shema({
    name:{type:String, required: true},
    password:{type: String, required: true},
    payload: Boolean,
    meta:{age:Number, website: String},
    createAt:String,
    updateAt:String,
    status: Boolean
});

module.exports=mongoose.model('User', userSchemas);