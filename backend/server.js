const express = require('express');
const fs = require('fs');
const path = require('path');
var cors = require('cors');

const bodyParser = require('body-parser');
const { addNewuser } = require('./services');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/signUp', async(req,res) => {
   try{
   const{email,password} = req.body;

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


const PORT = 8004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});