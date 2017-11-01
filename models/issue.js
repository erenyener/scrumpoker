var mongoose = require('mongoose');

var issueSchema = mongoose.Schema({
    title: String,
    sprintId: String,
    finalScore: Number,
    orderNumber: Number
});

var Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;