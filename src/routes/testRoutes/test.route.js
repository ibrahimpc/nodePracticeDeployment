const express = require('express')
const router = express.Router();

const testController=require('./test.controller')

router.get('/test',testController.testGet)

module.exports=router
