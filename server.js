const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

require("./src/config/db");
// const userSchema = new mongoose.Schema({
//     name:String,
//     age:Number
// })
// const User=mongoose.model('User',userSchema)
// app.get('/',(req,res)=>{
//     res.send('hi this is ibrahim nodemeon installed')
// })

// app.post('/post',(req,res)=>{
//     console.log(req.body)
//     const {name,age}=req.body
//
//     User.create(req?.body).then((data)=>{
//         res.send(`hi my name is ${name} and my age is ${age}`)
//         console.log(data,'USER DATA SAVED SUCCESSFULLY')
//     }).catch((e)=>{
//         console.log(e,'FAILED TO SAVE USER DETAILS')
//     })
// })

const appRoutes = require("./src/routes");
app.use("/", appRoutes);
// app.listen(3000)
const PORT = 3000;
const IP_ADDRESS = "192.168.1.7";

// app.listen(PORT, IP_ADDRESS, () => {
//     console.log(`Server running on http://${IP_ADDRESS}:${PORT}/`);
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
