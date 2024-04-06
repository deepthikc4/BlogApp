const express=require('express');
const router=express.Router();
const blogs=require('../model/blogs');
const jwt=require('jsonwebtoken');


router.use(express.json());
// verify token
function verifytoken(req,res,next){
const token=req.headers.token;

try {
    if(!token) throw 'unauthorized access';
// extract payload
let payload=jwt.verify(token,'reactblogapp');
if(!payload)throw 'unauthorized access';

next()

} catch (error) {
    res.status(404).send('caught in error');
}

}

router.post('/add',verifytoken,async(req,res)=>{

   
    try {
        const data=req.body;
        let newBlog=await blogs(data).save();
        console.log(newBlog);
        res.status(200).send({message:`data added`})
    } catch (error) {
        res.status(400).send('failed',error);
    }

})

router.get('/blogs',verifytoken,(req,res)=>{

    try {
     
      blogs.find().then((blogdetails)=>{
        res.status(200).send(blogdetails);
      })
    } catch (error) {
        res.status.send(error);
    }
})

router.delete('/deleteblog/:id',async(req,res)=>{
    try {
        let id=req.params.id;
        const deletedBlog= await blogs.findByIdAndDelete(id);
        console.log(deletedBlog);
        if(!deletedBlog)
        {
            console.log("no data found");
           return res.status(404).json({error:`no data found`});
        }
        res.status(204).send({message:`data deleted `});
    } catch (error) 
    {
        res.status(400).json({ error: 'Bad Request' });
    }
})



router.put('/up/:id',async(req,res)=>{
    try {
        let id=req.params.id;
        const updatedBlog= await blogs.findByIdAndUpdate(id, req.body);
        console.log(updatedBlog);
        if(!updatedBlog)
        {
            console.log("no data found");
           return res.status(404).json({error:`no data found`});
        }
        res.status(204).send({message:`data updated `});
    } catch (error) 
    {
        res.status(400).json({ error: 'Bad Request' });
    }
})

module.exports=router;



