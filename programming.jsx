import React, { useEffect, useState } from "react";
import axios from "axios";


function Programming(){

    const styleParent ={
        border:"1px solid silver",
        borderRadius:"2vw",
        padding:"2vw",
        marginTop:"2vh",
    }
    const style = {
        display:"flex",
        alignItems:"center",
        justifyContent:"space-around",
    }

    const [dataLearn,setDataLearn] = useState(null)
    const [dataTeach,setDataTeach] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:6000/prolearn");
                setDataLearn(response.data.D);
                const responseT = await axios.get("http://localhost:6000/proteach");
                setDataTeach(responseT.data.D)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);


    const handleLearn = async (e) => {

        e.preventDefault(); 

        if(e.target.user.value == localStorage.getItem("user")){
            console.log("you cant post a swap for yourself!")
        }else{
            try {
                const response = await axios.post("http://localhost:6000/postreq",{
                    user : e.target.user.value,
                    teach : e.target.teach.value,
                    learn : e.target.learn.value,
                    by : e.target.by.value,
                    type: "requestSend",
                    message: "",
                    descion : "",
                })    
                if(response.data.message === "cant"){
                    console.log("you already have this request!")
                }else if(response.data.message === "posted"){
                    console.log("posted mate!")
                }else{
                    console.log("not your mistake!")
                }
            } catch (error) {
                
            }
        }

        
        
    }


    
    

    return (
        <>
        <div>
            <h1>Learners</h1>
            {dataLearn && dataLearn.map(element=>(
                <div className="card" style={styleParent}>
                <p >{element.User}</p>
                <div className="card-child" style={style}>
                <p >Wants to learn: <b>{element.Learn}</b></p>
                <p >Wants to Teach: <b>{element.Teach}</b> </p>
                </div>
                <form onSubmit={handleLearn}>
                    <input type="hidden" name="user" value={element.User} />
                    <input type="hidden" name="teach" value={element.Teach} />
                    <input type="hidden" name="learn" value={element.Learn} />
                    <input type="hidden" name="by" value={localStorage.getItem("id")} />
                   <center><input type="submit" value='Connect'/></center>
                </form>
                </div>
            ))}
        </div>
        <div >
            <h1>Teachers</h1>
            {dataTeach && dataTeach.map((ele)=>(
                <div className="card" style={styleParent}>
                <p>{ele.User}</p>
                <div className="card-child" style={style}>
                    <p>Wants To Learn: <b>{ele.Learn}</b> </p>
                    <p>Wants To Teach: <b>{ele.Teach}</b> </p>
                </div>
                <form onSubmit={handleLearn}>
                    <input type="hidden" name="user" value={ele.User} />
                    <input type="hidden" name="teach" value={ele.Teach} />
                    <input type="hidden" name="learn" value={ele.Learn} />
                    <input type="hidden" name="by" value={localStorage.getItem("id")} />
                    <center><input type="submit" value='Connect'/></center>
                </form>
                </div>
            ))}
        </div>

        </>
        
    );
    
}

export default Programming;
