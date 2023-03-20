const express = require("express");
const router = express("router");


router.get("/:id", (req, res) => {
   const link = req.url;
   var lastPart = link.substring(link.lastIndexOf("/") + 1, link.length);
   console.log(lastPart);

   if(lastPart==='contact'){
      console.log('its contact')
        res.render("../views/contact.ejs",{text:"..."});
   }else if(lastPart==='blog-post'){
      console.log('its blog-post')
        res.render("../views/blog-post.ejs",{text:"..."});
   }else{
        res.render("../views/blog-details.ejs",{text:"..."});
   }
   console.log('im workin')
});


module.exports = router;