import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function Chatroom() {
    const chatterInfo = localStorage.getItem("chatter");
    const me = localStorage.getItem("user");
    const le = localStorage.getItem("learn");
    const te = localStorage.getItem("teach");


    const [Messages, setMessages] = useState(null);
    const chatContainerRef = useRef(null);

    const getMessages = async () => {
        try {
            const response = await axios.post("http://localhost:5000/getMess", { user: me, chatter: chatterInfo, learn : le , teach: te });
            setMessages(response.data.all);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Fetch messages initially
        getMessages();

        // Poll for new messages every 5 seconds (adjust as needed)
        const intervalId = setInterval(() => {
            getMessages();
        }, 3000); // Adjust interval as needed

        return () => {
            clearInterval(intervalId); // Clean up the interval on component unmount
        };
    }, []);

    useEffect(() => {
        // Scroll to the bottom of the chat container
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [Messages]); // Scroll when Messages state changes

    useEffect(() => {
        const handleScroll = () => {
            // Distance from the top of the document to the bottom of the page
            const distanceToBottom = document.documentElement.offsetHeight - (window.innerHeight + window.scrollY);
            
            // Check if the user is close to the bottom (e.g., within 100 pixels)
            if (distanceToBottom < 100) {
                // User is near the end of the page
                console.log('You are near the end of the page!');
                // You can perform any action here, like loading more content
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const sendMess = async (e) => {
        e.preventDefault();
        const Mess = e.target.mymess.value;

        try {
            const response = await axios.post("http://localhost:5000/sendmessage", { from: me, to: chatterInfo, message: Mess, learn : le , teach: te });
            if (response.data.resp === "done") {
                console.log('sent!');
                e.target.mymess.value = '';
            } else if (response.data.resp === "noCanDo") {
                console.log("no can do!");
            }
        } catch (error) {
            console.log("THIS IS YOUR ERROR! : ", error);
        }
    };

    return (
        <>
            <style>
                {`
                    .gotmessage {
                        background-color: blue;
                        color:white;
                        padding:1vw;
                        margin-top:2vw;
                        width:40%;
                        border-radius:2vw;
                        postion:fixed;
                        left:0;
                    }
                    .sentmessage{
                        background-color:grey;
                        color:white;
                        padding:1vw;
                        margin-top:2vw;
                        width:40%;
                        border-radius:2vw;
                    }
                    .message-box {
                        position: fixed;
                        bottom: 0;
                        padding:1vw;
                    }
                    .message-box input{
                        height:4vh;
                        width:70vw;
                        border-radius:1vw;
                        border:1px solid silver;
                    }
                    button{
                        height:4.85vh;
                        width:23.5vw;
                        border:none;
                        background-color:blue;
                        color:white;
                        font-weight:bold;
                        border-radius:1vw;
                    }
                `}
            </style>

            <div ref={chatContainerRef} style={{ overflowY: 'auto', height: '80vh' }}>
                {Messages && Messages.map(messa => (
                    <div key={messa._id} className={messa.from === chatterInfo ? 'gotmessage' : 'sentmessage'}>
                        <p>{messa.message}</p>
                    </div>
                ))}
            </div>

            <p>You Are chatting with: {chatterInfo}</p>
            <form onSubmit={sendMess} className='message-box'>
                <input type="text" name="mymess" /><button>Send</button>
            </form>
        </>
    );
}

export default Chatroom;
