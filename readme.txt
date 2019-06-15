To Do:
    .add more sports
    .create events in DB and display them
    .add tickets to cart 
    .change price based on the user's role
        
    
    
    
    


COMPLETED:
    .installed npm packages
    .created routes
    .created header and footer
    .Login/Sign page using modal class with bootstrap
    .link css file
    .routing with sport name in the link
    .create database
    .implement authentication and make sign up and login forms work
    .add roles to the user model 
    
    
    
    
    
//tickets file var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var TicketSchema = new mongoose.Schema({
    price: {type: String},
    tname: {type: String},
    venue: {type: String},
    date: {type: String}
    //sport: String
});

TicketSchema.plugin(passportLocalMongoose);

module.exports = mongoose.Schema("Ticket", TicketSchema);