const router = require("express").Router();
const homeController = require("../controllers/homeController");


router.get("/login", homeController.homePage);

//sign in GOOGLE ACCOUNT
router.get('/login/federated/google', homeController.loginGoogle);
router.get('/oauth2/redirect/google',homeController.loginGoogleRedirect);

router.post('/logout', homeController.logoutGoogle);



//sign in FACEBOOK ACCOUNT

router.get('/login/federated/facebook',homeController.loginFacebook);
router.get('/oauth2/redirect/facebook', homeController.loginFacebookRedirect);


module.exports = router;
