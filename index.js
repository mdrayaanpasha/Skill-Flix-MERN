import express, { request } from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import UserModel from "./auth.js";
import PostModel from "./post.js";
import requestModel from "./req.js";
import SwapModel from "./swap.js";
import messageModel from "./mess.js";
import http from 'http';
import WebSocket from 'ws';
import mongoose from 'mongoose'; 
import testModel from "./test.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app)
const wss = new WebSocket.Server({server})

wss.on("connection",(ws)=>{
    console.log("connected!")

    ws.on("mess",async(mess)=>{
        console.log("Recived this: ",mess)
    })
})







app.post("/register", async (req, res) => {
    try {
        const { user, pass } = req.body;
        const data = await UserModel.find({ name: user });
        let message = "created"
        let userId = "";
        if (data.length > 0) {
            message= "there";
        } else {
            try {
                const newUser = await UserModel.create({ name: user, password: pass });
                userId  = newUser._id;
            }catch (error) {
                console.error("Error creating user:", error);
                res.status(500).send({ Message: "Error creating user" , UserID : userId });
            }
        }
        res.send({Message : message , UserID : userId});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Internal server error" });
    }

    
});



app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await UserModel.findOne({ name: username });
        let message = "user not there";
        if (result && result.password === password) {
            res.json({ message: "authenticated", userId: result._id });
        } else if (result && result.password !== password) {
            res.json({ message: "wrong password" });
        } else {
            res.json({ message: "user not there" });
        }
        
    } catch (error) {
        console.error("Error during login:", error); // Add this log statement
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/posts",async (req,res)=>{
    let message = ""
    try {
        const {username,learn,teach,description} = req.body;
        const there= await PostModel.find({User:username, Learn: learn, Teach: teach})
        console.log(there)
        if(there.length > 0){
            message="already-there"
        }else{
            const result = await PostModel.create({User: username , Learn : learn ,Teach: teach, Description: description})
            message = "yes";
        }
        
    } catch (error) {
        console.log(error)
    }
    res.json({message})
})

app.get("/prolearn",async (req,res)=>{
    try {
        const D = await PostModel.find({Learn:"programming"});
        res.send({D})
    } catch (error) {
        
    }
})

app.get("/proteach",async (req,res)=>{
    try {
        const D = await PostModel.find({Teach:"programming"});
        res.send({D})
        console.log(D)
    } catch (error) {
        console.log(error)
    }
})


app.post("/postreq",async (req,res) =>{
    let message = "";
    try {
        const data = await requestModel.find(req.body);
        if(data.length > 0){
            message="cant"
        }else{
            await requestModel.create(req.body);
            message = "posted"
        }
    } catch (error) {
        console.log(error)
        message="no";
    }

    res.send({message})

} )



    app.post("/notify", async (req, res) => {
        try {
            const { User } = req.body;
            
    
    
            const notData = await requestModel.find({ user: User });
    
            console.log(notData)
            const update = async () =>{
                for(let element of notData){
                    const userInfo = await UserModel.find({_id:element.by})
                    userInfo.forEach(ele=>{
                        element.by = ele.name;
                    })
                }
            }
    
            await update();
           
            
    
            res.json({ result: notData });
        } catch (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });




//this is to handle the users response when they either accpet or reject the requests from the react pae notifications
app.post("/notreq",async (req,res)=>{ 

    //here am getting the data from the body which is general info!
    const data = {
        initilized:req.body.initilizer,
        request: req.body.requester,
        learn: req.body.learn,
        teach: req.body.teach,
    };
    
    console.log(data)
    //here just checking out if the desction was yes or no?

    //if desction was yes then this: 
    if(req.body.descion  === "Accept"){

        //first am trying to insert the data in the swap model because all accepted data's are insaerted there!
        try {
            await SwapModel.create(data);
            console.log("document posted in the snap model")
        } catch (error) {
            console.log("there is an error mate: ",error)
        }

    //then here is the code to insert in the notifications model to update
       const reqData = {
        user : req.body.requester,
        teach : req.body.teach,
        learn: req.body.learn,
        by :  req.body.initilizerId,
        type: "descion",
        message : `you request got Accepted by: ${req.body.initilizer} for: ${req.body.teach}-${req.body.learn}`,
        descion:"Accepted",  
    }
    console.log(reqData)
    //after making the schema then here trying to insert the data in the notification thing!
    try {
        await requestModel.create(reqData)
        console.log("inserted Mate!")
    } catch (error) {
        console.log("there is an error in the system that is ", error)
    }

    //now there is a last need that is to delete the request from the notification of poster:

    // - this is the first division where i get the id of the user who inserted the request!
    let requesterId = "";
    try {
        const findUser = await UserModel.find({name: req.body.requester}) 
        findUser.forEach((element)=>{
            requesterId = element._id.toString();
        })
    } catch (error) {
     console.log("there is an error mate: ",error)   
    }
    
    //this is the schema that am preparing to find the notification adn then delete it form the persobn!
    const notificationData = {
        user:req.body.initilizer,
        teach:req.body.teach,
        learn:req.body.learn,
        by: requesterId,
        type: "requestSend",
        message: "",
        descion: "",
    }

    try {
        await requestModel.deleteOne(notificationData)
        console.log("done deleted mate!")
    } catch (error) {
        console.log("no can do: ",error)
    }


    
    }else{

        // we are here cause the request was rejected! so here first am preparing the schema to insert in the notifications of the requester!

        const reqData = {
            user : req.body.requester,
            teach : req.body.teach,
            learn: req.body.learn,
            by :  req.body.initilizerId,
            type: "descion",
            message : `your request got Rejected by: ${req.body.initilizer} for: ${req.body.teach}-${req.body.learn}`,
            descion:"Rejected"
        }
        console.log(reqData)
        try {
            await requestModel.create(reqData)
            console.log("inserted!")
        } catch (error) {
            console.log("cant insert there is an error in ")
        }

        let requesterId = "";
        try {
            const findUser = await UserModel.find({name: req.body.requester}) 
            findUser.forEach((element)=>{
                requesterId = element._id.toString();
            })
        } catch (error) {
        console.log("there is an error mate: ",error)   
        }

        const notificationData = {
            user:req.body.initilizer,
            teach:req.body.teach,
            learn:req.body.learn,
            by: requesterId,
            type: "requestSend",
            message: "",
            descion: "",
        }
    
        try {
            await requestModel.deleteOne(notificationData)
            console.log("done deleted mate!")
        } catch (error) {
            console.log("no can do: ",error)
        }
        

      
    }
})



app.post("/getcon", async (req, res) => {
    const { user } = req.body; 
    try {
        const d = await SwapModel.find({ $or: [{ initilized: user }, { request: user }] });

       res.json({message : d});

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post("/sendmessage",async (req,res)=>{
    const {from, to , message, learn, teach} = req.body;
    
    try {
        await messageModel.create(req.body);
        res.json({resp: "done"})
    } catch (error) {
        console.log("THIS IS YOUR ERROR!")
        res.json({resp: "noCanDo"})
    }

})


app.post("/getMess",async (req,res)=>{
    const {user,chatter,learn,teach} = req.body;
    const Learn = learn;
    const Teach = teach;

    //either from is by user or chatter and to is by user or chatter
    try {
        const all = await messageModel.find({
            $and: [
                {
                    $or: [
                        { from: user },
                        { from: chatter }
                    ]
                },
                {
                    $or: [
                        { to: user },
                        { to: chatter }
                    ]
                },
                {
                    learn: Learn
                },
                {
                    teach: Teach
                }
            ]
        });
        res.json({all})       
    } catch (error) {
        
    }
})


app.get("/getTrade",async (req,res)=>{
    try {
        const D = await PostModel.find({$or:[
            {Learn: "trading"},
            {Teach :"trading"}
        ]})
        res.json({D})
    } catch (error) {
        console.log(error)
    }
    
})

app.post("/postTrade",async(req,res)=>{
    let message = "";
    console.log(req.body);
    try {
        const D = await requestModel.find(req.body);
        if(D.length > 0){
            message = "already exists"
        }else{
            await requestModel.create(req.body);
            message = "done mate"
        }

    } catch (error) {
        message = "no";
    }
    res.json({message});
})


app.get("/lang",async (req,res)=>{
    try {
        const D = await PostModel.find({$or:[
            {Learn : "language"},
            {Teach : "language"}
        ]})
        res.json({D})
    } catch (error) {
        console.log(error)
    }
})

app.get("/cook",async (req,res)=>{
    try {
        const D = await PostModel.find({$or:[
            {Learn : "cooking"},
            {Teach : "cooking"}
        ]})
        res.json({D})
    } catch (error) {
        console.log(error)
    }
})


app.listen(6000)