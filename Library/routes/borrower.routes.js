const express = require("express");
const { postBorrower, getBorrowers, getBorrower, updateBorrowerOne, deleteBorrower } = require("../controllers/borrower.Controller");
const router = express.Router();

router.post("/add", postBorrower);

router.get("/get", getBorrowers);
router.get("/singleBook/:id", getBorrower);

router.patch("/update/:id", updateBorrowerOne);
router.delete("/delete/:id", deleteBorrower);


module.exports = router;