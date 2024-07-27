const mongoose = require('mongoose')

dbConnect().then((res)=>console.log('DB CONNECTED')).catch((e)=>console.log(e,'DB CONNECT FAILED'))
async function dbConnect(){
    await mongoose.connect('mongodb://localhost:27017/Practice')
}
