var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var SportSchema = new mongoose.Schema(
   {
      name  : {type: String},
      image : {type: String},
      events: [
            {
               title  : {type: String},
               price : {type: String},
               venue: {type: String}
            }
      ]
   }
);

SportSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Sport", SportSchema);