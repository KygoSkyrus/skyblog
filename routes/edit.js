const express = require("express");
const router = express("router");

//here you can also implememnt the thing that you included in category.js so that if the blog is present only then the page will load or else 404 page will be rendered
router.get("/:id", (req, res) => {
   
   const adminCookie = req.cookies["admin"];
   console.log(adminCookie); 

   if (adminCookie == null) {
      console.log("cookie doesn't exist");
      res.redirect("/admin/login");
    } else {

   res.render("../views/panel/blog-edit.ejs",{text:'...'});
   }
});


module.exports = router;