const Listing =require("./models/listing");
const Review =require("./models/review");
const ExpressError =require("./utils/ExpressError.js");
const  { listingSchema } =require("./schema.js");
const  { reviewSchema } =require("./schema.js");


module.exports.isLoggedIn = (req, res, next) =>{
  console.log(req.user);
    if(!req.isAuthenticated()){
      req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in");
      return  res.redirect("/login");
    }
      next();
  };

  module.exports.saveRedirectUrl=(req, res, next) => {
    if(req.session.redirectUrl) {
      res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
  };

 module.exports.isOwner= async (req,res ,next)=> {
  let { id } = req.params;
  let listing =await Listing.findById(id);
      if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error"," you are not the owner of this listing");
      return   res.redirect(`/listings/${id}`);
      }
      next();
 };

 // used to set validation for listings
module.exports.validateListing =(req,res,next) => {
  let {error}=listingSchema.validate(req.body);
    if(error){ 
      let errMsg =error.details.map((el) => el.message).join(" , ");
      throw new ExpressError(400,errMsg);
  }
  else{
    next();
  }
};


   // used to set validation for review
   module.exports.validateReview =(req, res, next) => {
    console.log(req.params.id);
    
    let {error}=reviewSchema.validate(req.body);
      if(error){   
        let errMsg =error.details.map((el) => el.message).join(" , ");
        throw new ExpressError(400,errMsg);
    }
    else{
      next();
    }
  };

  module.exports.isReviewAuthor= async (req,res ,next)=> {
    let { id , reviewId } = req.params;
    let review =await Review.findById(reviewId);
        if(!review.author.equals(res.locals.currUser._id)){
          req.flash("error"," you are not the author  of this Review");
        return   res.redirect(`/listings/${id}`);
        }
        next();
   };
  