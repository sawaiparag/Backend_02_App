require("./config/database").connect()
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const User = require("./model/user")

const app = express()
app.use(express.json())

app.get("/", (req,res) => {
    res.send("auth system works")
})

app.post("/register", async (req,res)=>{
    try {
        const{firstname, lastname, email, password} = req.body

        if (!(email && password && firstname && lastname)) {
            res.status(401).send("All item are mandatory")
        }
     //check user exists or not
       const existingUser = await User.findOne({email: email})
       if (existingUser){
        res.status(401).send("User already in database")
       }

      // encrypt the pass
      const myEncyPassword = await bcrypt.hash(password, 10) 

      //create new entry
      const NewUser = await User.create({
        firstname,
        lastname,
        email,
        password: myEncyPassword
      })

      //create token and send to user
      const token = jwt.sign({
        id: user._id, email
      }, 'sparag' , {expiresIn: '200h'})

      user.token = token
      user.password = undefined

       res.staus(201).json(user)
    


    } catch (error){
        console.log("error is in resposnse")
    }
})

app.post("/login", async (req,res) => {
    try{
        // coolect info from frontend

        const{email,password} = req.body
    
        //validate
        if (!(email && password)){
            res.staus(401).send("email and password are mandaroty")
        }
        //check user in databese
        const user = await User.findOne({email})
        // user not exist                    do toorrw
        //match the pass
        if(user && (await bcrypt.compare(password, user.password))) {
           const token =  jwt.sign({id:user._id, email},'sparag', {expiresIn: '200h'})

           user.password = undefined
           user.token = token

           const options = {
            expires: new Date (Date.now() + 2*24*60*60*1000),
            httpOnly: true
           }
           res.status(200).cookie("token", token, options).json({
            sucess: true,
            token,
            user
           })
        }
        // create token and send

        res.sendStatus(400).send("eamil or pass is wrong")





    } catch (error){
        console.log(error)
    }
})
