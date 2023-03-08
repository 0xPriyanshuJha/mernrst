const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('../db/conn');

const User = require('../model/user');

router.get('/', (req, res)=> {
    res.send(`Hello world from the server router.js`);
    });

//promises version
// router.post('/register', (req, res)=> {

// const {name, email, phone, work, password, cpassword} = req.body;  

// if (!name || !email || !phone || !work || !password || !cpassword){
//   return res.status(422).json({error: "bhrde bhai"});
// }

//   User.findOne({email:email})
//   .then((userExist) =>{
//     if(userExist){
//       return res.status(422).json({error: "Already exist"});
//     }

//     const user = new User({name, email, phone, work, password, cpassword});
//     user.save().then(() => {
//       res.status(201).json({message: "user registered"});
//     }).catch((err) => res.status(500).json({error: "Failed to register"}));
//   }).catch(err =>{console.log(err);});
// });


//async-await
router.post('/register', async (req, res)=> {

  const {name, email, phone, work, password, cpassword} = req.body;  
  
  if (!name || !email || !phone || !work || !password || !cpassword){
    return res.status(422).json({error: "Please fill the form correctly"});
  }

  try{
   const userExist = await User.findOne({email:email});

   if(userExist){
    return res.status(422).json({error: "Already exist"});
  }
  const user = new User({name, email, phone, work, password, cpassword});
  await user.save();

  res.status(201).json({message: "user registered"});

  }catch(err){
    console.log(err); 
  }
  
  }); 

  //login route

  router.post('/signin', async (req, res) =>{

try{
 const{email, password} = req.body;

 if(!email || !password){
  return res.status(400).json({error:"fill it up"})
 }


const userlogin = await User.findOne({email:email});

// console.log(userlogin);

if(userlogin){
  const isMatch = await bcrypt.compare(password, userlogin.password);

if(!isMatch) {

  res.status(400).json({error:"Invalid credentials"});

} else {

  res.json({message:"sign in successfully"});
}
} else {

  res.status(400).json({error:"Invalid credentials"});
}


}catch(err){
console.log(err);
}
  });

module.exports = router;