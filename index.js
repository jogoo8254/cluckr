const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const router = require("./routes/clucks");
const moment = require('moment')
const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));


  app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use((req,res,next)=>{
    res.locals.username = req.cookies.username || '';
    next();
})

// roots ----------------------------
app.use("/", router);
// app.use("/clucks", router);


const PORT = 4545;
const HOSTNAME = 'localhost';

app.listen(PORT, HOSTNAME,() =>{
    console.log(`listening on hostname:port => ${HOSTNAME}:${PORT}`);
})
