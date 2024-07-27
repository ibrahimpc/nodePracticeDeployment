const mongoose = require("mongoose");

const hotelSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type:String,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    ratings:{
        type:Number,
        required:true
    }


})


module.exports=mongoose.model('Hotel',hotelSchema)
