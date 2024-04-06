const mongoose=require('mongoose');

mongoose.connect(process.env.mongoDBURL)
.then(()=>{

    console.log(`db is connected`)
})
.catch(()=>{

    console.log(`connection error`);
})