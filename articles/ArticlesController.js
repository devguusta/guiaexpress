const express = require('express');
const { default: slugify } = require('slugify');
const router = express.Router();
const Category = require("../categories/Category")
const Articles = require("../articles/Article");
const Article = require('../articles/Article');
router.get("/admin/articles", (req,res) => {
    Article.findAll(
        {
            include: [{model: Category}]
        }
    ).then(articles => {
        res.render("admin/articles/index", {
            articles: articles,
        })
    })

})

router.get("/admin/articles/new", (req,res) => {

    Category.findAll().then(categories => {
        console.log(categories);
        res.render("admin/articles/new", {categories: categories});
    })
   
});

router.post("/articles/save", (req,res)=> {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    console.log(title)
;
    Articles.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category    
        }).then(articles => {
            res.redirect("/admin/articles");
        })
        ;
})

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    console.log(id);
    if(id != undefined) {
    if(!isNaN(id)){
       Article.destroy({
            where: {
                id: id
            }
        }).then(()=> {
            res.redirect("/admin/articles");
        })

    } else {
        res.redirect("/admin/articles");
    }
    
    }
    else {
        res.redirect("/admin/articles");
    }
    
})

module.exports = router;