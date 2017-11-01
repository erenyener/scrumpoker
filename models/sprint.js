var mongoose = require('mongoose');

var sprintSchema = mongoose.Schema({
    title: String,
    beautifiedUrl: String,
    numberOfVoters: Number
});

var Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;