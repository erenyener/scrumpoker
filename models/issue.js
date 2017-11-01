var mongoose = require('mongoose');

var issueSchema = mongoose.Schema({
    title: String,
    sprintId: String,
    finalScore: Int32Array,
    orderNumber: Int32Array
});

var Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;