var addToCart = document.getElementById('addToCart');
var Ticket = require("./models/tickets");

addToCart.addEventListener("click", function(req, res){
    Ticket.create(req.body.event, function(err, ticket){
           if(err){
               console.log(err);
           } else {
               ticket.save();
                currentUser.tickets.push(ticket);
                currentUser.save();
                res.redirect("/events");
           }
    });
})