var mongoose = require('mongoose');

var voteSchema = mongoose.Schema({
    value: Int32Array,
    issueId: String
});

var Vote = mongoose.model("vote", voteSchema);

module.exports = Vote;