var http = require("http");
var nodemailer = require('nodemailer');
const express = require('express');
const cors=require('cors')
var smtpTransport = require('nodemailer-smtp-transport');
// this is important
const app = express();
app.use(cors())
app.use(express.json())
app.use(
    express.urlencoded({
      extended: true
    })
  )
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // * - http/https both are allowed
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
app.post('/sendmail', (req, res) => {
   
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'mishritha7@gmail.com',
            pass: 'mishi94490'
        }
    }));
    var message = {
        from: 'mishritha7@gmail.com',
        to: req.body.email,
        subject: 'Recipe',
        html: '-'+req.body.content
    };
    transporter.sendMail(message, (error, info) => {
        if (error) {
            return console.log(error);
        }
        // response.status(200).send({
        //     message: "Email sent"
        // });
        // console.log(info)
        res.json({message:"message sent",info                                                                                             })
    });
})
app.get('/mish',(req,res)=>{
  res.json({message:"Welcome"})
})
var server = http.createServer(app)
server.listen(3000, "localhost", () => {
    // Console will print the message
    console.log('Server running at http://127.0.0.1:8081/');
})


