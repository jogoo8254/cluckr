const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const rootRouter = require("./routes/root");
const clucksRouter = require("./routes/clucks");

const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));


app.use(
    methodOverride((req, res) => {
      if (req.body && req.body._method) {
        const method = req.body._method;
        return method;
      }
    })
  );

  app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use((req,res,next)=>{
    res.locals.username = req.cookies.username || '';
    next();
})

// roots ----------------------------
app.use("/", rootRouter);
app.use("/clucks", clucksRouter);


const PORT = 4545;
const HOSTNAME = 'localhost';

app.listen(PORT, HOSTNAME,() =>{
    console.log(`listening on hostname:port => ${HOSTNAME}:${PORT}`);
})

function checkIfAuthenticated(req,res,next){
    if(!req.cookies.username){
        res.redirect("/login");
    }
    next();
}