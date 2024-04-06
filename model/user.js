const mongoose=require('mongoose');

// create schema
const schema=mongoose.Schema({
name:String,
email:String,
address:String,
username:String,
password:String

})

// map to collection

const userModel=mongoose.model('user',schema);
module.exports=userModel;