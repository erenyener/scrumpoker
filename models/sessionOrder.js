var mongoose = require('mongoose');

var sessionOrderSchema = mongoose.Schema({
    sprintId: String,
    activeOrderNumber: Number
});

var SessionOrder = mongoose.model("SessionOrder", sessionOrderSchema);

module.exports = SessionOrder;