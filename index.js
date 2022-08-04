const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const slugify = require("slugify");

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


connection.authenticate().then(() => {
    console.log('Authentication successful')
}).catch((error) => {
    console.error(error);
})

// app.use("/", categoriesController);
// app.use("/", articlesController);


app.get("/", (req,res)=>{
   res.render('index');
})

app.get("/admin/categories/new", (req,res)=>{
    res.render('admin/categories/new');
})

app.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if(title != undefined){
      Category.create({
        title: title,
        slug: slugify(title),
      }).then(()=> {
        res.redirect("/");
      })
    } else {
        res.redirect("/admin/categories/new");
    }
})

app.get("/admin/categories", (req, res)=> {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories});
    })
  

})

app.listen(8080, ()=> {
    console.log('Server running at http://localhost:8080')
})