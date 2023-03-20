const express = require("express");
const router = express("router");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });


//sender's email
const pswrd = "";
const emailAdd = "dheerajgupta.whyshy@gmail.com";

//smtp server
var smtpTransport = nodemailer.createTransport({ 
  service: "gmail",
  auth: {
    user: emailAdd,
    pass: pswrd,
  },
});


 //users messages related routes
router.post("/message", urlencodedParser, (req, res) => {
  const details=req.body;
  console.log(details)

  
  try { 
    //sending veriication email
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    host = req.get("host");
    console.log("host:" + fullUrl);

    mailOptions = { 
      from: emailAdd,
      to: "kygoskyrus@gmail.com",
      subject: "Message",
      html: `<div style="background-color: #f5f5f5;box-shadow: 0 0 3px #9d9d9d; border-radius:6px ; padding:10px 20px;"><div><h4 style="color:black;">Name</h4><p style="color:#545454">${details.name}</p></div><div><h4 style="color:black;">Email</h4><p style="color:#545454">${details.mail}</p></div><div><h4 style="color:black;">Phone</h4><p style="color:#545454">${details.phone}</p></div><div><h4 style="color:black;">Message</h4><p style="color:#545454">${details.textarea}</p></div></div>`,
    };
 
    console.log(mailOptions); 
  //  res.redirect('back');
  //   smtpTransport.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       console.log(error);
  //       //res.end("error");
  //     } else {
  //       console.log("Message sent: " + info.response);
  //       //return res.status(422).json({ message: "email sent" });
  //     }
  //   });

    var con = mysql.createConnection({ 
      host: "localhost",
      user: "root",
      password: "",
      database: "bloggingsite",
    });

    //to insert a record
    var sql = `INSERT INTO contact (name, email, phone, note) VALUES ('${details.name}','${details.mail}','${details.phone}','${details.textarea}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("record inserted!!!");
      res.redirect('back')
    });
  } catch (err) {
    console.log(err);
  }
  
});
 
//for showing database messages records
router.post("/showMessage", async (req, res) => {
  try {
    //database credentials
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "bloggingsite",
    });
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      con.query("SELECT * FROM contact", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    });
  } catch (err) {
    console.log(err);
  }
});
 //the api endpoint(route) for deleting these msgs is in server.js


 








//for showing database blogs records
router.post("/show", async (req, res) => {
  try {
    //database credentials
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "bloggingsite",
    });
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      con.query("SELECT * FROM blog", function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
       // res.send(result);
    //    const category = new CATEGORY(c);
    // await category.save();

        const filteredArray = result.filter(obj => obj.status !== '1');//only sending the blogs that are marked visible
        res.send(filteredArray);
      });
    });
  } catch (err) {
    console.log(err);
  }
});

//for showing database blogs records in blogs-management (admin panel)
router.post("/show2", async (req, res) => {
  try {
    //database credentials
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "bloggingsite",
    });
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      con.query("SELECT * FROM blog", function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        res.send(result);
      });
    });
  } catch (err) {
    console.log(err);
  }
});




module.exports = router;