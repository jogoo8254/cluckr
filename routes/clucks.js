const express = require("express");
const router = express.Router();
const knex = require("../db/client");

router.get("/", (req, res) => {
    knex("clucks")
      .orderBy("createdAt", "DESC")
      .then(clucks => {
        res.render("clucks/index", { clucks: clucks });
      });
  });


  
// NAME: cluck#new, METHOD: GET, PATH: /clucks/new
router.get("/new", (req, res) => {
    res.render("clucks/new");
  });
  
  // NAME: cluck#create, METHOD: POST, PATH: /clucks
  router.post("/", (req, res) => {
    const content = req.body.content;
    const image_url = req.body.image_url;
    knex("clucks") // --- START SQL
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
  router.get("/:id", (req, res) => {
    const id = req.params.id;
  
    knex("clucks")
      .where("id", id)
      .first()
      .then(cluck => {
        if (cluck) {
          res.render("clucks/show", { cluck: cluck });
        } else {
          res.send(`Cannot find cluck with id=${id}`);
        }
      });
  });
  
  module.exports = router;