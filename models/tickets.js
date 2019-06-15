var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var TicketSchema = new mongoose.Schema(
   {
      userId  : {type: String},
      userName: {type: String},
      title : {type: String},
      venue: {type: String},
      price: {type: String},
   }
);

TicketSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Ticket", TicketSchema);