const mongoose = require('mongoose');
const userschema = require('./users')
const schema = mongoose.Schema;

const roleSchema = new schema({
    roleName: {type:String, required:true},
    status: Boolean,
    description: String,
    createAt: String,
    updateAt: String,
    userBelong: [{type:schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Role', roleSchema);