const express = require("express");

const router = express.Router();

const hotelController = require("./hotel.controller");

router.post("/hotel", hotelController.saveHotel);
router.get("/getHotel/:location?", hotelController.getHotel);
router.put("/updateHotel/:id", hotelController.updateHotel);
router.delete("/deleteHotel/:id", hotelController.deleteHotel);
router.post("/send-email", hotelController.makeEmailCall);

module.exports = router;
