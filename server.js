const express = require("express");
const mysql = require("mysql");
const app = express();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const articles = require("./routes/articles");
const blogEdit = require("./routes/edit");
const categorySingle = require("./routes/category");
const admin = require("./routes/admin");

app.set("view engine", "ejs");

app.use(cookieParser());

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(require("./routes/route"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/views/panel"));
app.use(express.json());

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "./views/upload",
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bloggingsite",
});

app.use("/category", categorySingle); //for all category routes
app.use("/", articles); //every route from the blogrouter will be added as suffuc of the /blogs

app.use("/admin", admin); //for all admin related routes
app.use("/admin/blog-edit", blogEdit); //for blog-edit route

//for homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//for contact page
// app.get("/contact", (req, res) => {
//   res.sendFile(__dirname + "/views/contact.html");
// });

//for contact page
// app.get("/blog-post", (req, res) => {
//   res.sendFile(__dirname + "/views/blog-post.html");
// });

//this recive the note editor content 4sec after the rest of the form data submits
app.post("/blogdataEditor", upload.single("image"), (req, res) => {
  const details = req.body;
  console.log("editor", details);

  if (details.summernote !== "<p><br></p>") {
    console.log("yes", details.summernote.length);

    try {
      var sql = `UPDATE blog SET detail = '${details.summernote}' WHERE title = '${details.title}' AND url = '${details.url}' AND shortdescription = '${details.shortdesc}' AND authorname = '${details.author}' AND metatitle = '${details.metatitle}' AND metakeywords = '${details.metakeyword}' AND metadescription = '${details.metadesc}' `;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("summernote added", result);
        res.redirect("/admin/blogs-management");
      });
    } catch (err) {
      console.log(err);
    }
  }
});

//blog form data
app.post("/blogdata", upload.single("image"), (req, res) => {
  const details = req.body;
  console.log("DD", details);

  const tempPath = req.file.path;
  console.log(tempPath);

  const targetPath = path.join(
    __dirname,
    `./views/upload/${req.file.originalname}`
  );

  // for uploading image  file in the folder(only the .png etc files will be saved)
  if (
    path.extname(req.file.originalname).toLowerCase() === ".png" ||
    path.extname(req.file.originalname).toLowerCase() === ".jpg" ||
    path.extname(req.file.originalname).toLowerCase() === ".jpeg" ||
    path.extname(req.file.originalname).toUpperCase() === ".PNG" ||
    path.extname(req.file.originalname).toUpperCase() === ".JPG" ||
    path.extname(req.file.originalname).toUpperCase() === ".JPEG"
  ) {
    fs.rename(tempPath, targetPath, (err) => {
      if (err) return handleError(err, res);
      console.log("image uploaded");
      //res.redirect("/admin/blogs-management");
    });
  } else {
    fs.unlink(tempPath, (err) => {
      if (err) return handleError(err, res);
      res
        .status(403)
        .contentType("text/plain")
        .end("Only .png .jpg .jpeg files are allowed!");
    });
  }

  var date = new Date().toLocaleDateString();

  try {
    var sql = `INSERT INTO blog (title, url, category, type, shortdescription, image, authorname, metatitle, metakeywords, metadescription,date, status) VALUES ?`;
    var values = [
      [
        details.title,
        details.url,
        details.category,
        details.select,
        details.shortdesc,
        req.file.originalname,
        details.author,
        details.metatitle,
        details.metakeyword,
        details.metadesc,
        date,
        "checked"
      ],
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("user registered!!!", result);
    });
  } catch (err) {
    console.log(err);
  }
});

//deleting blog records
app.post("/deleteblog", async (req, res) => {
  const details = req.body;
  console.log(details);

  try {
    var sql = `DELETE FROM blog WHERE id = ${details.id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      //console.log(result);
      console.log("Number of records deleted: " + result.affectedRows);
      res.redirect("/blogs-management");
      // res.redirect(req.originalUrl)
    });
  } catch (err) {
    console.log(err);
  }
});

//seeting blogs visibility
app.post("/blogVisibility", async (req, res) => {
  const details = req.body;
  console.log(details);

  try {
    var sql = `UPDATE blog SET status = '${details.val}' WHERE id = '${details.id}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      //console.log(result);
      console.log("Number of rows affected: " + result.affectedRows);
      //res.redirect("/blogs-management");
      // res.redirect(req.originalUrl)
    });
  } catch (err) {
    console.log(err);
  }
});




//for showing single detailed blog records
app.post("/singleblog", async (req, res) => {
  const details = req.body;
  console.log("single blog", details);

  try {
    con.query(
      `SELECT * FROM blog  WHERE url = '${details.blogurl}' `,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (err) {
    console.log("error", err);
  }
});

//for showing previous blog records
app.post("/prev", async (req, res) => {
  const details = req.body;
  console.log("prev id", details);

  try {
    con.query(`SELECT * FROM blog `, function (err, result, fields) {
      if (err) throw err;
      console.log(result);

      for (var i = result.length - 1; i >= 0; i--) {
        if (result[i].id <= details.pdd) {
          console.log(i, result[i]);
          res.send(result[i]);
          return;
        }
      }
    });
  } catch (err) {
    console.log("error", err);
  }
});

//for showing next blog records
app.post("/next", async (req, res) => {
  const details = req.body;
  console.log("next id", details);

  try {
    con.query(`SELECT * FROM blog `, function (err, result, fields) {
      if (err) throw err;
      console.log(result);

      for (var i = 0; i < result.length; i++) {
        if (result[i].id >= details.ndd) {
          console.log(i, result[i]);
          res.send(result[i]);
          return;
        }
      }
    });
  } catch (err) {
    console.log("error", err);
  }
});

//for editing a  blog( this send back the data related to a specific blog to the blog edit page)
app.post("/blogedit", async (req, res) => {
  const details = req.body;
  console.log("bid", details);

  try {
    con.query(
      `SELECT * FROM blog  WHERE url = '${details.blogurl}' `,
      function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
      }
    );
  } catch (err) {
    console.log(err);
  }
});

//edited blog submission
app.post("/blogeditsubmit", upload.single("image"), (req, res) => {
  const details = req.body;
  console.log("blogeditsubmit", details);

  if (req.file === undefined) {
    console.log("req.file is undefined / no image");

    var date = new Date().toLocaleDateString();

    try {
      var sql = `UPDATE blog SET title = '${details.title}', url = '${details.url}', category = '${details.category}', type = '${details.select}', shortdescription = '${details.shortdesc}', authorname = '${details.author}', metatitle = '${details.metatitle}', metakeywords = '${details.metakeyword}', metadescription = '${details.metadesc}',date = '${date}' WHERE id = '${details.bid}' `;

      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("user registered!!!", result);
        //res.redirect("/admin/blogs-management");
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    const tempPath = req.file.path;
    const targetPath = path.join(
      __dirname,
      `./views/upload/${req.file.originalname}`
    ); //destination folder

    //for uploading image  file in the folder(only the .png etc files will be saved)
    if (
      path.extname(req.file.originalname).toLowerCase() === ".png" ||
      path.extname(req.file.originalname).toLowerCase() === ".jpg" ||
      path.extname(req.file.originalname).toLowerCase() === ".jpeg" ||
      path.extname(req.file.originalname).toUpperCase() === ".PNG" ||
      path.extname(req.file.originalname).toUpperCase() === ".JPG" ||
      path.extname(req.file.originalname).toUpperCase() === ".JPEG"
    ) {
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
        console.log("image uploaded");
      });
    } else {
      fs.unlink(tempPath, (err) => {
        if (err) return handleError(err, res);
        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png .jpg .jpeg files are allowed!");
      });
    }

    var date = new Date().toLocaleDateString();

    try {
      var sql = `UPDATE blog SET title = '${details.title}', url = '${details.url}', category = '${details.category}', type = '${details.select}', shortdescription = '${details.shortdesc}', image = '${req.file.originalname}', authorname = '${details.author}', metatitle = '${details.metatitle}', metakeywords = '${details.metakeyword}', metadescription = '${details.metadesc}',date = '${date}' WHERE id = '${details.bid}' `;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("user registered!!!", result);
      });
    } catch (err) {
      console.log(err);
    }
  }
});

//deleting messages records (contact form)
app.post("/deleteMessage", async (req, res) => {
  const details = req.body;
  console.log(details.id);

  try {
    var sql = `DELETE FROM contact WHERE id = ${details.id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      res.send({ affectedRows: result.affectedRows });
      //add feature to tell frontend that record has been deleted
    });
  } catch (err) {
    console.log(err);
  }
});

//usersBlog (blogs send by the users inserted into db in two phase)
//this recive the note editor content 4sec after the rest of the form data submits
app.post("/usersblogdataEditor", upload.single("image"), (req, res) => {
  const details = req.body;
  console.log("editor", details);

  if (details.summernote !== "<p><br></p>") {
    console.log("yes", details.summernote.length);

    try {
      var sql = `UPDATE usersblog SET detail = '${details.summernote}' WHERE  email = '${details.email}' AND title = '${details.title}' AND url = '${details.url}' AND shortdescription = '${details.shortdesc}' AND authorname = '${details.author}' AND metatitle = '${details.metatitle}' AND metakeywords = '${details.metakeyword}' AND metadescription = '${details.metadesc}' `;
      con.query(sql, function (err, result) {
        console.log("last errrrr");
        if (err) throw err;
        console.log("last errrrr dnt run");
        console.log("summernote added", result);
        res.redirect("back");
      });
    } catch (err) {
      console.log(err);
    }
  }
});
//usersblog form data
app.post("/usersblogdata", upload.single("image"), (req, res) => {
  const details = req.body;
  console.log("DD", details);

  if (req.file === undefined) {
    console.log("req.file is undefined / no image");

    var date = new Date().toLocaleDateString();

    try {
      var sql = `INSERT INTO usersblog (email, title, url, category, type, shortdescription, authorname, metatitle, metakeywords, metadescription,date) VALUES ?`;
      var values = [
        [
          details.email,
          details.title,
          details.url,
          details.category,
          details.select,
          details.shortdesc,
          details.author,
          details.metatitle,
          details.metakeyword,
          details.metadesc,
          date,
        ],
      ];
      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("data inserted!!!", result);
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    const tempPath = req.file.path;
    console.log(tempPath);

    const targetPath = path.join(
      __dirname,
      `./views/upload/${req.file.originalname}`
    );

    // for uploading image  file in the folder(only the .png etc files will be saved)
    if (
      path.extname(req.file.originalname).toLowerCase() === ".png" ||
      path.extname(req.file.originalname).toLowerCase() === ".jpg" ||
      path.extname(req.file.originalname).toLowerCase() === ".jpeg" ||
      path.extname(req.file.originalname).toUpperCase() === ".PNG" ||
      path.extname(req.file.originalname).toUpperCase() === ".JPG" ||
      path.extname(req.file.originalname).toUpperCase() === ".JPEG"
    ) {
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
        console.log("image uploaded");
      });
    } else {
      fs.unlink(tempPath, (err) => {
        if (err) return handleError(err, res);
        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png .jpg .jpeg files are allowed!");
      });
    }

    var date = new Date().toLocaleDateString();

    try {
      var sql = `INSERT INTO usersblog (email,title, url, category, type, shortdescription, image, authorname, metatitle, metakeywords, metadescription,date) VALUES ?`;
      var values = [
        [
          details.email,
          details.title,
          details.url,
          details.category,
          details.select,
          details.shortdesc,
          req.file.originalname,
          details.author,
          details.metatitle,
          details.metakeyword,
          details.metadesc,
          date,
        ],
      ];
      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("data inserted!!!", result);
      });
    } catch (err) {
      console.log(err);
    }
  }
});

//catergory RElated

//for showing category records
app.post("/showCategory", async (req, res) => {
  console.log("sc");

  try {
    con.query("SELECT * FROM category", function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

//for adding category records
app.post("/addCategory", (req, res) => {
  const details = req.body;
  console.log(details);

  try {
    con.query("SELECT * FROM category", function (err, result, fields) {
      if (err) throw err;
      console.log("restlt", result);

      if (result.length === 0) {
        console.log("lengthiszero");
        var sql = `INSERT INTO category (category) VALUES ('${details.cat}')`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("category inserted!!!");
          res.send({ message: "categoryAdded" });
        });
      } else {
        let answer = "";

        for (var i = 0; i < result.length; i++) {
          console.log("detcat", details.cat);
          console.log("rescat", result[i].category);

          if (result[i].category == details.cat) {
            console.log("it exists at", result[i]);
            answer += "exist";
            res.send({ message: "alreadyExists" }); //putting this will give error that cannoit set header after they are snet ,this might be bcz of the loop,,so whne the it loops for the first time and and its not the same ,,they are counting it asthe first time that res.send has apppear
            break; //so that it stop right there instead of looping till the end
          }
        }

        console.log(answer);
        if (answer !== "exist") {
          console.log("i work yeah");
          var sql = `INSERT INTO category (category) VALUES ('${details.cat}')`;
          con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("category inserted!!!");
            res.send({ message: "categoryAdded" });
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});

//for deleting category records
app.post("/deleteCategory", async (req, res) => {
  const details = req.body;
  console.log(details);

  try {
    var sql = `DELETE FROM category WHERE id = ${details.id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      res.send({ affectedRows: result.affectedRows, message: "deleted" });
    });
  } catch (err) {
    console.log(err);
  }
});

//search blog (from search bar)
app.post("/searchblog", upload.single("image"), async (req, res) => {
  const value = req.body;
  console.log(value);

  try {
    if (value.val == "") {
      res.send({}); //an empty data object is sent
    } else {
      con.query(
        `SELECT * FROM blog WHERE title Like '%${value.val}%'`,
        function (err, result, fields) {
          if (err) throw err;
          //console.log(result);
          res.send(result);
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
});

//ADMIN LOGIN
app.post("/admin/login", urlencodedParser, async (req, res) => {
  const credentials = req.body;
  console.log(credentials);

  try {
    var sql = `SELECT * FROM admin WHERE username = '${credentials.userName}' AND password = '${credentials.password}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;

      if (result.length >= 1) {
        if (
          credentials.userName === result[0].username &&
          credentials.password === result[0].password
        ) {
          console.log("admin logged in!!!");
          var value = `${credentials.userName}`;
          res.cookie("admin", value, { maxAge: 6000000, httpOnly: true });
          return res.redirect("/admin/dashboard");
        }
      } else {
        //res.send({ message: "wrong credentials" });
        console.log("wrong credentials");
        res.render("../views/panel/login.ejs", {
          text: "Credentials mismatched!! Try again",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

//change password
app.post("/cpswrd", async (req, res) => {
  const details = req.body;
  console.log("abc", details);

  try {
    //to update a record
    var sql = `UPDATE admin SET password = '${details.newPassword}' WHERE password = '${details.password}' AND username= '${details.uname}' `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.affectedRows >= 1) {
        console.log("password changed!!!");
        res.send({ message: "changed" });
      } else {
        console.log("something went wrong");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

//ADMIN LOGOUT
app.post("/logout", async (req, res) => {
  console.log("logout  route");
  res.clearCookie("admin");
  res.send({ message: "loggedOut" });
});

//this is to get the admin's username and send it to show on admin panel
app.post("/getAdminName", async (req, res) => {
  const adminCookie = req.cookies["admin"];
  res.send({ admin: adminCookie });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running at ${port}`));