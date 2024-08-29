const AuthView = (req,res)=>{
    try{
        res.render('loginView')
    }catch(e){
        console.log(e.message)
    }
}

const ProfileView = (req,res)=>{
    try{
        //Authenticats google login by google strategy's =>isAuthenticated() function ....
        if(req.isAuthenticated())
            //if authenticed send view and user data......
            res.render('profileView', {user : req.user})
        else res.redirect('/login-view')
    }catch(e){
        console.log(e.message)
    }
}


const Logout = async(req,res)=>{
    req.logout( (err)=>{
        if(err) res.redirect('/error-view')
        else res.redirect('/login-view')
    })
}

const ErrorView = (req,res)=>{
    try{
        res.render('errorView')
    }catch(e){
        console.log(e.message)
    }
}



module.exports = {
    Logout,
    AuthView,
    ProfileView,
    ErrorView
}