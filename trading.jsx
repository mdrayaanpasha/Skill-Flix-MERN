//goal is to fetch all posts of trading
//then to handle the requests!

import { useState, useEffect } from "react";
import axios from "axios";

function Trading(){
    const [data,setData] = useState(null);

    useEffect(()=>{
        const getData = async ()=>{
            try {
                const response = await axios.get("http://localhost:5000/getTrade");
                console.log(response.data.D);
                setData(response.data.D) 
            } catch (error) {
                console.log(error)

            }
            
        }
        getData();
    },[])


    const sendreq = async (L,T,User) => {

        if(User === localStorage.getItem("user")){
            console.log("no can do!")
        }else{
            try {
            
                const response = await axios.post("http://localhost:5000/postTrade",{
                user : User,
                teach : T,
                learn : L,
                by : localStorage.getItem("id"),
                type: "requestSend",
                message: "",
                descion : "",
            });
                console.log(response.data.message);
        
        } catch (error) {
            console.log("ERROR: ",error)
        }
        }
        
        
    }


    return (
        <>
        <div className="teach">
           <h1>Trading Teachers</h1> 
            {data && data.map(post => (
            post.Teach === "trading" ? (
                <div className="teach-card">
                    <p>User: {post.User}</p>
                    <p>Wants To Teach: {post.Teach} Wants To Learn: {post.Learn}</p>
                    <button onClick={()=>{sendreq(post.Teach,post.Learn,post.User)}}>Connect</button>
                </div>
            ) : null
            ))}
        </div>
        <div className="learn">
            <h1>Trading Learners</h1>
            {data && data.map(post=>(
                post.Learn ==="trading" ? (
                    <div className="learn-card">
                    <p>User: {post.User}</p>
                    <p>Wants To Teach: {post.Teach} Wants To Learn: {post.Learn}</p>
                    <button onClick={()=>{sendreq(post.Teach,post.Learn,post.User)}}>Connect</button>
                </div>
                ) : null
            ))}
        </div>
        </>

    );
}


export default Trading;