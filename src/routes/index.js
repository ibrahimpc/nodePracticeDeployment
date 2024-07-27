const express = require('express')
const rootRouter = express.Router();


const tests = require('./testRoutes/test.route')
const hotels = require('./HotelRoutes/hotel.route')
rootRouter.use('/',tests)
rootRouter.use('/',hotels)


module.exports=rootRouter
