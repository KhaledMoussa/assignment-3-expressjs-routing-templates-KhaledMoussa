var mongoose = require('mongoose');


//building the schema
var Schema = mongoose.Schema;

//creating a schema for the quote/pic sharing post app
var schema = new Schema({
  imageurl:{type: String, required: true},
  description:{type: String, required: true},
  title:{type: String, require: true},

});


//exporting the model
module.exports = mongoose.model("Photo", schema);
