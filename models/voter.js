var mongoose = require('mongoose');

var voterSchema = mongoose.Schema({
    name: String,
    sprintId: String
});

var Voter = mongoose.model("voter", voterSchema);

module.exports = Voter;