const express =require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');

router.get("/admin/users", (req,res) => {
    res.send("Listagem de usuários");
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
})

router.post("/users/create", async (req, res) => {
    var email = req.body.email
    var password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    var oldUser = await User.findOne({
        where: {
            email: email
        },
    })
    if(oldUser) {
        return res.status(400).json({
            status: 409,
            message: "User already exist. Please login"
        });
    }

    User.create({
        email: email,
        password: hash,
    }).then(() => {
        res.redirect("/");
    }).catch((err) => {
        res.redirect("/")
    })
   

})
module.exports = router;