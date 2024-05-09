import React, { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
    const [noti, setNoti] = useState([]);

    useEffect(() => {
        const fetchData = async () => { 
            try {
                const name = localStorage.getItem("user")
                console.log(name)
                const resp = await axios.post("http://localhost:5000/notify", { User: name });
                if (resp.data.result && resp.data.result.length > 0) {
                    setNoti(resp.data.result);
                    console.log(resp.data.result); // Logging fetched notifications
                } else {
                    console.log("You have no notifications!");
                }
            } catch (error) {
                console.log("Error fetching notifications:", error);
            }
        }
        fetchData();
    }, []);

    const handlereq = async (by, te, le, des) => {
        try {
            const data = {
                initilizer: localStorage.getItem("user"),
                requester: by,
                learn: le,
                teach: te,
                descion: des,
                initilizerId : localStorage.getItem("id")
            };
            const response = await axios.post("http://localhost:5000/notreq", data);
            console.log(response.data);
        } catch (error) {
            console.error("Error handling request:", error);
        }
    };
    

    return (
        <div>
            <h2>Notifications</h2>
            <div>
                {noti.map((notifi) => {
                    if (notifi.type === "requestSend") {
                        return (
                            <div key={notifi._id}>
                                <p>{notifi.by} Sent You A Request To Swap: {notifi.teach}-{notifi.learn}</p>
                                <button onClick={() => handlereq(notifi.by, notifi.teach, notifi.learn, "Accept")}>Accept</button>
                                <button onClick={() => handlereq(notifi.by, notifi.teach, notifi.learn, "Reject")}>Reject</button>
                            </div>
                        );
                    } else {
                        
                        return (
                            <>
                            <h1>this is Status for Your Requests</h1>
                            {notifi.descion === "Accepted" ? <> <p>{notifi.message}</p> <a href="/home">Go here To Connect!</a> </> : <p>{notifi.message}</p>}                            
                            </>
                        ); 
                    }
                })}
            </div>
        </div>
    );
}

export default Notifications;
