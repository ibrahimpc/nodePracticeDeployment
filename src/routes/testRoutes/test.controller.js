const testModel = require('../../models/test')


const testGet =async(req,res)=>{

try{
  console.log('get request')
  // const result = await  testModel.create(req.body)
  res.send('data saved successfully')
}catch(e){

}
}

module.exports={testGet}
