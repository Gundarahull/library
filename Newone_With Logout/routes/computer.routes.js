const express = require("express");
const {
  getComputers,
  addComputer,
  getComputer,
  updateComputer,
  deleteComputer,
} = require("../controllers/computer.controller");
const router = express.Router();

router.post("/add", addComputer);

router.get("/get", getComputers);
router.get("/singleComputer/:id", getComputer);

router.patch("/update/:id", updateComputer);
router.delete("/delete/:id", deleteComputer);

module.exports = router;
