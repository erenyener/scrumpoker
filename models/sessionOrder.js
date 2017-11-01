var mongoose = require('mongoose');

var sessionOrderSchema = mongoose.Schema({
    sprintId: String,
    activeOrderNumber: Int32Array
});

var SessionOrder = mongoose.model("SessionOrder", sessionOrderSchema);

module.exports = SessionOrder;