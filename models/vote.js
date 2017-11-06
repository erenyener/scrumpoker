var mongoose = require('mongoose');

var voteSchema = mongoose.Schema({
    value: Number,
    issueId: String,
    sprintId: String,
    voterId: String
});

var Vote = mongoose.model("vote", voteSchema);

module.exports = Vote;