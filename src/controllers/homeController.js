const passportGoogle = require('passport');
const passportFacebook = require('passport');
require("../config/auth_Google")(passportGoogle);
require("../config/auth_facebook")(passportFacebook);


const homePage=(req,res,next)=>{
    //console.log("-------------------");
    //console.log(req.user);
    res.render("loginPage");
}

const loginGoogle=(req,res,next)=>{
    passportGoogle.authenticate('google')(req,res,next);
}

const loginGoogleRedirect=(req,res,next)=>{
    passportGoogle.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    })(req,res,next);
}

const logoutGoogle=(req,res,next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}


const loginFacebook=(req,res,next)=>{
    passportFacebook.authenticate('facebook')(req,res,next);
}

const loginFacebookRedirect=(req,res,next)=>{
    passportFacebook.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
      })(req,res,next);
}


module.exports={
    homePage,
    loginGoogle,
    loginGoogleRedirect,
    logoutGoogle,
    loginFacebook,
    loginFacebookRedirect
}