

const mongoose=require('mongoose');
const schema=mongoose.Schema({

    title:String,
    description:String,
    image:String
})

const blogsmodel=mongoose.model('blog',schema);

module.exports=blogsmodel;