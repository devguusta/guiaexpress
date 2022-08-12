function adminAuth(req,res,next){
    if(req.session.user != undefined){
        next();
    } else {
        res.json({
            status: 401,
            message: "User is not authorized"
        });
    }
    
}

module.exports = adminAuth;