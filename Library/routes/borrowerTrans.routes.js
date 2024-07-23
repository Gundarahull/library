const express = require("express");
const { addBorrowingTrans, allBorrowed, returnBorrowed } = require("../controllers/borrowerTrans.controler");
const router = express.Router();


router.post('/add',addBorrowingTrans)
router.post('/all',allBorrowed)

router.post('/return',returnBorrowed)



module.exports = router;