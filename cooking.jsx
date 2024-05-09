//goal is to :
// - get data from teachers and learners of language
// - handle requests to connnect!

import axios from "axios";
import { useEffect, useState } from "react";

function Cooking(){
    const [data,setData] = useState(null);
    
    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const response  = await axios.get("http://localhost:5000/cook");
                setData(response.data.D)
            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
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
    return(
        <>
        <div className="teach">
            <h2>Here Are Teachers!</h2>
        {data && data.map(p=>(
            p.Teach === "cooking"  ? (
                <div className="teach-card">
                <p>{p.User}</p>
                <p>Wants To Learn: {p.Learn} In return of:  {p.Teach}</p>
                <button onClick={()=>{sendreq(p.Learn,p.Teach,p.User)}}>Connect</button>
                </div>
            ) : null
            
        ))}
        </div>
        <div className="learn">
            <h2>Here Are Learners!</h2>
            {data && data.map(p=>(
                p.Learn === "cooking" ? (
                    <div className="learn-card">
                        <p>{p.User}</p>
                        <p>Wants To Learn: {p.Learn} In return of:  {p.Teach}</p>
                        <button onClick={()=>{sendreq(p.Learn,p.Teach,p.User)}}>Connect</button>
                    </div>
                ) : null
            ))}
        </div>
        
        </>
    )
}


export default Cooking