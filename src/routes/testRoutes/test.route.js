const express = require('express')
const router = express.Router();

const testController=require('./test.controller')

router.post('/test',testController.testGet)

module.exports=router
