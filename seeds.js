var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name:"Cloud's Rest",
            image:"https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
            description: "Bacon ipsum dolor amet beef ribs meatball tongue doner beef meatloaf. Cow pastrami shank chicken venison, bacon picanha ground round pork loin pork chop fatback. Shank jerky doner tail meatball tri-tip frankfurter pancetta cow corned beef pastrami porchetta cupim. Jerky sausage landjaeger kevin. Kevin shank chicken picanha drumstick swine brisket tail bresaola ground round. Landjaeger short loin ground round, corned beef swine bresaola venison sirloin doner."
        },
        {
            name:"Desert Mesa",
            image:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "Bacon ipsum dolor amet beef ribs meatball tongue doner beef meatloaf. Cow pastrami shank chicken venison, bacon picanha ground round pork loin pork chop fatback. Shank jerky doner tail meatball tri-tip frankfurter pancetta cow corned beef pastrami porchetta cupim. Jerky sausage landjaeger kevin. Kevin shank chicken picanha drumstick swine brisket tail bresaola ground round. Landjaeger short loin ground round, corned beef swine bresaola venison sirloin doner."
        },
        {
            name:"Canyon Floor",
            image:"https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "Bacon ipsum dolor amet beef ribs meatball tongue doner beef meatloaf. Cow pastrami shank chicken venison, bacon picanha ground round pork loin pork chop fatback. Shank jerky doner tail meatball tri-tip frankfurter pancetta cow corned beef pastrami porchetta cupim. Jerky sausage landjaeger kevin. Kevin shank chicken picanha drumstick swine brisket tail bresaola ground round. Landjaeger short loin ground round, corned beef swine bresaola venison sirloin doner."
        }
    ]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        
         // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    // create a comments
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);    
                            } else {
                                campground.comments = comment;
                                campground.save();
                                console.log("Created new comment");
                            }
                        }
                    );
                   
                }
            });
        });
    });
   
    
    // add a few comments
}

module.exports = seedDB;