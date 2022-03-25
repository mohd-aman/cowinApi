const express = require('express')
const path = require("path");
const cp = require("child_process");
const nodemailer = require("nodemailer");
const app = express()
const PORT = process.env.PORT || 3000
require("dotenv").config();
// console.log(process.env)
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.API_PASS,
    },
  });


app.get("/details/:pin/:age/:email",async function(req,res){
    let pin = req.params.pin;
    let email = req.params.email;
    let age = req.params.age;
    let arr = cp.execSync(`node script ${pin} ${age}`);
    // console.log(arr+"");
    res.send(arr);
    let info = await transporter.sendMail({
        from: '"Mohd Aman" <saifiamaan@gmail.com>', // sender address
        to:  `${email}`, // list of receivers
        subject: "Figth Against Covid", // Subject line
        html: "<b>Schedule of Vaccination</b>", // html body
        attachments:[{path:"./Schedule.xlsx"}]
      });
    
      console.log("Message sent: %s", info.messageId);
})

app.listen(PORT,function(){
  console.log(`server is running ${PORT}`)
})