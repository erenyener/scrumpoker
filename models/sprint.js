var mongoose = require('mongoose');

var sprintSchema = mongoose.Schema({
    title: String,
    beautifiedUrl: String,
    numberOfVoters: Int32Array
});

var Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;