const express = require("express");
const router = express("router");
const mysql = require("mysql");

const CATEGORY = require("../schema/category")


router.get("/:category", async (req, res) => {
   
  console.log("im workin");

  const link = req.url;
  var lastPart = link.substring(link.lastIndexOf("/") + 1, link.length);
  console.log(lastPart);

  try {
   
    let result =await CATEGORY.find({})
    console.log("RET",result)

    for (var i = 0; i < result.length; i++){
         if(result[i].category==lastPart){
            res.render("../views/category-single.ejs", {text:"..."} );
            break;
         }
         else{
            if(i===result.length-1){
               res.render("../views/error.ejs", {text:"..."} );
            }
         }
      }
    // con.query("SELECT * FROM category", function (err, result, fields) {
    //   if (err) throw err;

    //   for (var i = 0; i < result.length; i++){
    //      if(result[i].category==lastPart){
    //         res.render("../views/category-single.ejs", {text:"..."} );
    //         break;
    //      }
    //      else{
    //         if(i===result.length-1){
    //            res.render("../views/error.ejs", {text:"..."} );
    //         }
    //      }
    //   }
    //   console.log(result);
    // });
  } catch (err) {
    console.log(err);
  }

  //res.render("../views/category-single.ejs", {text:"..."} );
});

module.exports = router;
