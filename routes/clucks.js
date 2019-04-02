const express = require("express");
const router = express.Router();
const knex = require("../db/client");
const moment = require('moment')

router.get('/',(req,res)=>{
    res.render('home',{username: res.locals.username});
});


router.get('/login',(req,res)=>{
    res.render('login');
});

// equivalence of one day!
const ONE_DAY = new Date(Date.now()+1*24*60*60*1000);

router.post('/login',(req,res)=>{
    const { username } = req.body;
    res.cookie('username', username, {expires: ONE_DAY})
    res.redirect('/clucks');
})

router.post('/sign_in', (req,res)=>{
    const username = req.body.username;
    res.cookie("username", username, {maxAge: ONE_DAY});
    res.redirect("/clucks");
});
router.post('/sign_out',(req,res)=>{
    res.clearCookie("username");
    res.redirect("/login");
});

  
// NAME: cluck#new, METHOD: GET, PATH: /clucks/new
router.get("/clucks",checkIfAuthenticated, (req, res) => {
  const id = req.params.id;
  const username = req.cookies.username;
  knex("cluck")
    .where("username",username)
    .orderBy("created_at", "DESC")
    .then(clucks => {
      if (clucks) {
        res.render("clucks/new", { clucks, moment });
      } else {
        res.send(`Cannot find cluck with id=${id}`);
      }
    });
  });
  
  // NAME: cluck#create, METHOD: POST, PATH: /clucks
  router.post("/clucks", (req, res) => {
    const content = req.body.content;
    const image_url = req.body.image_url;
    knex("cluck") // --- START SQL
      .insert({
        username: req.cookies.username,
        image_url: image_url,
        content: content
      })
      .returning("*") // --- END SQL
      .then(data => {
        const cluck = data[0];
        // -- EXECUTE SQL
        res.redirect(`/clucks/${cluck.id}`);
      });
  });
  
  // NAME: cluck#show, METHOD: GET, PATH: /clucks/:id
  //            👇 a wildcard match
  router.get("/clucks/:id", (req, res) => {
    const id = req.params.id;
  
    knex("cluck")
      .where("id", id)
      .orderBy("created_at", "DESC")
      .then(clucks => {
        if (clucks) {
          res.render("clucks/show", { clucks, moment });
        } else {
          res.send(`Cannot find cluck with id=${id}`);
        }
      });
  });
  
  
  function checkIfAuthenticated(req,res,next){
    if(!req.cookies.username){
        res.redirect("/login");
    }
    next();
}
  module.exports = router;