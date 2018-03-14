const mongoose = require('mongoose');
const schema = mongoose.Schema;

const newsDraffSchema = new schema({
    codenews: Number,
    groupnews: {type: schema.Types.ObjectId, ref:'groupnews'},
    title: {type: String, required: true},
    shortcontent: {type: String, required: true},
    createuser: String,
    createdate: String,
    updateuser: String, 
    updatedate: String,
    metatitle: String
});

module.exports = mongoose.model('newsdraff', newsDraffSchema);