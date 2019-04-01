const express = require('express');
const logger = require('morgan');

const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use(cookieParser());

app.use((req,res,next)=>{
    res.locals.username = req.cookies.username || '';
    next();
})

app.get('/',(req,res)=>{
    res.render('home',{username: res.locals.username});
});

app.get('/login',(req,res)=>{
    res.render('login');
});

// equivalence of one day!
const ONE_DAY = new Date(Date.now()+1*24*60*60*1000);

app.post('/login',(req,res)=>{
    const { username } = req.body;
    res.cookie('username', username, {expires: ONE_DAY})
    res.redirect('/');
})

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