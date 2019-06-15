//SETTING UP express, mangoose and body-parser
var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    session        = require("express-session"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    localStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    User           = require("./models/users"),
    Sport          = require("./models/sports"),
    Ticket         = require("./models/tickets"),
    seedDB         = require("./seeds");
    
mongoose.connect("mongodb://localhost:27017/sog_system", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');    
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Barcelona! mes que un club",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.session = req.session;
    next();
});
//seedDB();
    
//HOME PAGE
app.get("/", function(req, res){
        res.render("home");
});

//EVENTS PAGE
app.get("/events", function(req, res){
    //show all sports from DB
    Sport.find({}, function(err, allSports){
        if(err){
            console.log(err);
        }else {
            res.render("events", {sports: allSports});
        }
    });
});

//SPORT BY ID ROUTE
app.get("/events/:id", isLoggedIn, function(req, res){
    //find the sport with provided id
    Sport.findById(req.params.id, function(err, foundSport){
        if(err){
            console.log(err);
        }else{
            res.render("tickets", {sport: foundSport});
         }
     });
});

//POST TICKET
app.post("/events", isLoggedIn, function(req, res){
    var title = req.body.title;
    var price = req.body.price;
    var venue = req.body.venue;
    var userName = req.user.firstName;
    var userId = req.user._id;
    var newTicket = {userId: userId, userName: userName, title: title, venue: venue, price: price};
    User.findById(req.user.id, function(err, user){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Ticket.create(newTicket, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                //redirect back to campgrounds page
                req.user.tickets.push(newlyCreated);
                console.log(newlyCreated);
                res.redirect("/events");
            }
        });
       }
       });
});
    
//CART PAGE
app.get("/cart", isLoggedIn, function(req, res){
      Ticket.find({}, function(err, allTickets){
        if(err){
            console.log(err);
        }else {
            res.render("cart", {tickets: allTickets});
        }
    });
});

//CHECKOUT ROUTE
app.get("/confirm", isLoggedIn, function(req, res){
    res.render("confirmation");
});


//SCHEDULES PAGE
app.get("/schedule", isLoggedIn, function(req, res){
    res.render("schedule");
});


//REGISTRATION FORM
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, country: req.body.country, role: req.body.role});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/events"); 
        });
    });
});
//=======================================
//AUTHENTICATION ROUTES
//=======================================

//LOGIN FORM
app.get("/login", function(req, res){
    res.render("login");
});

//handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/events",
        failureRedirect: "/login" 
    }), function(req, res){
});

//logout route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/events");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("listenning");
});