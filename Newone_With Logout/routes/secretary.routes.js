const express = require("express");
const { addSecretary, logoutSecretary, againLogin } = require("../controllers/secretary.controller");
const router=express.Router()

router.post('/add',addSecretary)
router.post('/logout',logoutSecretary)
router.post('/again',againLogin)

module.exports=router