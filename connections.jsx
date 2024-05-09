import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Connections() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:5000/getcon", { user: localStorage.getItem("user") });
                setData(response.data.message);
            } catch (error) {
                console.error("Error occurred:", error);
            }
        };

        fetchData();
    }, []);

    const handle = (i)=>{
        if(i.initilized === localStorage.getItem("user")){
            localStorage.setItem("chatter",i.request)
            localStorage.setItem("learn",i.learn)
            localStorage.setItem("teach",i.teach)
            window.location.href = "/chatroom"
        }else{
            localStorage.setItem("chatter",i.initilized)
            localStorage.setItem("learn",i.learn)
            localStorage.setItem("teach",i.teach)
            window.location.href = "/chatroom"
        }
    }
    return (
        <div>
            <h1>Connections</h1>
                {data.map((item) => (
                        <div className="card">
                        <p>Initialized: {item.initilized}</p>
                        <p>Request: {item.request}</p>
                        <p>Learn-Teach : {item.learn}-{item.teach}</p>
                        <button onClick={()=>{handle(item)}}>Connect</button>
                    </div>
                ))}
        </div>
    );
}

export default Connections;
