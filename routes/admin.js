const express = require("express");
const router = express("router");

//for all admin routes
router.get("/:admin", (req, res) => {

  const adminCookie = req.cookies["admin"];
  console.log(adminCookie);

  const link = req.url;
  var lastPart = link.substring(link.lastIndexOf("/") + 1, link.length);
  console.log(lastPart);

  switch (lastPart) {
    case "login":
      console.log("login");
      res.render("../views/panel/login.ejs", { text: "..." });
      break;
    case "blogs-management":
      console.log("bm");
      if (adminCookie == null) {
        console.log("cookie doesn't exist");
        res.redirect("/admin/login");
      } else {
        res.render("../views/panel/blogs-admin.ejs", { text: "..." });
      }
      break;
      case "messages":
        console.log("bm");
        if (adminCookie == null) {
          console.log("cookie doesn't exist");
          res.redirect("/admin/login");
        } else {
          res.render("../views/panel/messages.ejs", { text: "..." });
        }
        break;
        case "dashboard":
          console.log("bm");
          if (adminCookie == null) {
            console.log("cookie doesn't exist");
            res.redirect("/admin/login");
          } else {
            res.render("../views/panel/dashboard.ejs", { text: "..." });
          }
          break;
    default:
      res.render("../views/error.ejs", { text: "..." });
  }

});

module.exports = router;
