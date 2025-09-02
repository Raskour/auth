const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var cors = require('cors');

const bodyParser = require('body-parser');
const { addNewuser, checkAuthentication } = require('./services');
const authMiddleware = require('./middleware/auth')
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/signUp', async(req,res) => {
   try{
   const{email,password} = req.body;
//    console.log({email,password})

     await addNewuser(email,password);
    res.json({message:'User has been created'})
   } catch(error){
    if(error.message === "Email exists"){
        return res.status(400).json({error:"Account already exists"})
    }
    console.error(error);
    res.status(500).json({error:'Something went wrong'})
   }
 
})

app.post('/login', async(req,res) => {
    try{

        const {email,password} = req.body;
        const user = await checkAuthentication(email,password);
        if(!user){
          return  res.status(401).json({message:'Invalid credentials'});

        }
            //create access token
            const accessToken = jwt.sign(
                {email:user.email}, //payload
                process.env.JWT_ACCESS_SECRET, //secret key
                {expiresIn: process.env.ACCESS_TOKEN_EXPIRE}
            );

            res.json({
                message:` ${user.email}You are successfully logged in`,
                accessToken
            });
    }catch(err){
        console.error(err);
        res.json({message:'Server error'})
    }
})

app.get('/home', authMiddleware, (req,res) => {
    res.json({message:`Welcome ${ req.user.email}`})
})

const PORT = 8004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});