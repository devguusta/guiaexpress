const express = require('express');
const router = express.Router();
router.get("/categories", (req,res) => {
    res.send("ROUTER OF CATEGORIES");
})

router.get("/admin/categories/new", (req,res) => {
    res.send("ROUTER OF CREATE NEW CATEGORY");
});

module.exports = router;