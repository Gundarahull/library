require("dotenv").config();

const express = require("express");
const db = require("./db/db");
const app = express();
const port = 3000;

//for parsing the Data
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))



//Integrating Routes
const BookRoutes=require('./routes/book.routes')
app.use('/books',BookRoutes)

const ComputerRoutes=require('./routes/computer.routes')
app.use('/computers',ComputerRoutes)

const Borrower=require('./routes/borrower.routes')
app.use('/borrower',Borrower)

const BorrowerTransRoutes=require('./routes/borrowerTrans.routes')
app.use('/borrowertrans',BorrowerTransRoutes)

app.listen(3000, () => {
  console.log("server Started ");
});


