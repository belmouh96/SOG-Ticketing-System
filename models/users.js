var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
   username: {type: String},
   password: {type: String},
   role: {type: String},
   firstName: {type: String},
   lastName: {type: String},
   role: {type: String},
   tickets: [
      {
         id:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Ticket"
       }
      }   
   ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);