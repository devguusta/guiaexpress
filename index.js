const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const userController = require("./user/UserController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./user/User");

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


connection.authenticate().then(() => {
    console.log('Authentication successful')
}).catch((error) => {
    console.error(error);
})

 app.use("/", categoriesController);
 app.use("/", articlesController);
 app.use("/", userController);


app.get("/", (req,res)=>{
    Article.findAll(
        {
            include: [{model: Category}]
        }
    ).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {
                articles: articles,
                categories: categories
                
            });
        })
       
    })
  
})

app.get("/:slug", (req,res) => {
    var slug = req.params.slug;
    Article.findOne({
        order: [
        ['id', 'DESC']
        ],
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            })
            
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
})

app.get("/category/:slug", (req, res) =>{
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category!= undefined){
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories})
            })

        } else {
            res.redirect("/");
        }
    }).catch(err => {
        console.log(err);
    })
})


app.listen(8080, ()=> {
    console.log('Server running at http://localhost:8080')
})