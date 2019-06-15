var mongoose = require("mongoose");
var User     = require("./models/users");
var Sport  = require("./models/sports");



var data = [
  {
    name: "soccer",
    image: "https://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/450656615_1.jpg?itok=LXAJVfPh",
    events: [
      {
        title: "France VS Argentina",
        price: "220.00",
        venue: "Maracana Stadium"
      },
      {
        title: "Senegal VS Brazil",
        price: "200.00",
        venue: "Maracana Stadium"
      },
      {
        title: "USA VS Portugal",
        price: "230.00",
        venue: "Maracana Stadium"
      }
    ]
  },
  {
    name: "swimming",
    image: "https://fortunedotcom.files.wordpress.com/2016/08/rtsltvj.jpg",
    events: [
      {
        title: "freestyle 100m",
        price: "85.00",
        venue: "Carioca Arena"
      },
      {
        title: "backstroke 200m",
        price: "85.00",
        venue: "Carioca Arena"
      }
    ]
  },
  {
    name: "athletics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmjJiUXodWFqJhhAf398vHk5PTELUMu1kN0Fi7hoiOCAK-WGvlRg",
    events: [
      {
        title: "100m men",
        price: "120.00",
        venue: "RIO Olympic Stadium"
      },
      {
        title: "100m women",
        price: "120.00",
        venue: "RIO Olympic Stadium",
        sport: "Athletics"
      },
      {
        title: "1000m men",
        price: "120.00",
        venue: "RIO Olympic Stadium"
      }
    ]
  },
  {
    name: "wrestling",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdqyLEa6RNnsjaN67GJcXszwMnThH3S2PiiZx0D3tnPg_R0dHx",
    events: [
      {
        title: "Men Wrestling quarter finals",
        price: "145.00",
        venue: "RIO Olympic Arena",
      },
      {
        title: "Men Wrestling semi finals",
        price: "145.00",
        venue: "RIO Olympic Arena",
      },
      {
        title: "Women Wrestling quarter finals",
        price: "145.00",
        venue: "RIO Olympic Arena",
      }
    ]
  },
  {
    name: "fencing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3-XJdG2_Bwezvb3ePRNHrivO_l6QGeG0iAK8QQ8SHsqdg1A2sBQ",
    events: [
      {
        title: "Fencing Men",
        price: "100.00",
        venue: "Futur Arena",
      },
      {
        title: "Fencing Women",
        price: "100.00",
        venue: "Futur Arena",
      }
    ]
  },
  {
    name: "gymnastics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv2aa2JVdVp90x85AOqiHU2ozpLEwBhiiG8MA_GO0UGDCGxwU0",
    events: [
      {
        title: "Gymnastics Men",
        price: "100.00",
        venue: "Futur Arena",
      },
      {
        title: "Gymnastics Women",
        price: "100.00",
        venue: "Futur Arena",
      }
    ]
  }
];

function seedDB(){
    
    // Sport.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("removed sport!");
    //add sports to DB
    data.forEach(function(seed){
                Sport.create(seed, function(err, sport){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a sport");
                        sport.save();
                    }
                });
    });
    // });
}

module.exports = seedDB;