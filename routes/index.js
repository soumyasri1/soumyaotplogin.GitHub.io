const express = require("express");

const router = express.Router();

console.log("router is loaded");

router.get("/", (req, res) => {
  res.send("all ohk :) check API by PostMan");
});

//----------to handle all routes of /authroutes url----------------//
router.use("/authroutes", require("./authroutes"));

module.exports = router;
