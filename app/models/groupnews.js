const mongoose = require('mongoose');
const schema = mongoose.Schema;

const groupnewschema = new schema({
    name: String, 
    status: Boolean,
    createuser: String, 
    createdate: String,
    updateuser: String,
    updatedate: String,
    parentgroup: {type: schema.Types.ObjectId, ref: 'groupnews'}
})
module.exports = mongoose.model('groupnews', groupnewschema);