var express = require("express"),
    router  = express.Router(),
    Campground = require("../models/campground")
    

//Index show all campgrounds
router.get("/",function(req,res){
    // Get all campgrounds from DB
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err); 
        } else {
            res.render("campgrounds/index",{campgrounds:allCampgrounds, page: 'campgrounds'});
        }
    });
});

//Create: add a new campground to db
router.post("/", isLoggedIn,function(req,res){
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name,price: price, image: image, description:desc,author: author}
   // Create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           // Redirect back to campground page
           console.log(newlyCreated);
           res.redirect("/campgrounds");
       }
   })
   
});

// New: Show page to add new campgrounds
router.get("/new", isLoggedIn, function(req,res){
    res.render("campgrounds/new");
})

// SHOW - shows more info about one campground
router.get("/:id",function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            // render show templete with campground
            res.render("campgrounds/show",{campground: foundCampground});
        }   
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});
//UPDATE ROUTE
router.put("/:id", checkCampgroundOwnership, function(req, res){
    //find and update the correct campgroud
    //redirect somewhere(show page)
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//midlewere
function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error","Campground not found");
                res.redirect("back");
            } else {
                // does use own the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error","you don't have permission to do that");
                    res.redirect("back");
                }
            }   
        })
    } else {
        req.flash("error","You need to be logged in to do that")
        res.redirect("back");
    }
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = router;