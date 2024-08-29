const route = require('express').Router()
const passport = require('passport')
const controllers = require('../controllers/AuthCtrl')



//Applying google auth middleware to authenticate and get user data.
route.get('/auth/google', 
    
    passport.authenticate("google",{
            scope:["profile","email"]
    })
)
//callback url for redicrection succeffuly login or failure----------------
//here the uri will come which we crete over google in OAuth 2.0 Client IDs
route.get('/auth/google/redirect-success-uri', 
    
//on failure.........
    passport.authenticate("google",{
          failureRedirect: "/login-view"
    }),
    //on sucess......
    async (req,res)=>{
        res.redirect('/profile-view')
    }

)
route.get('/logout',controllers.Logout)
route.get('/login-view',controllers.AuthView)
route.get('/error-view',controllers.ErrorView)
route.get('/profile-view',controllers.ProfileView)


module.exports = route