import axios from "axios";
import React, { useState } from "react";
import './all.css'
import progImg from './images/programming.png'
import langImg from "./images/languages.png"
import tradeImg from "./images/trader.png"
import cookImg from "./images/cooking.png"



function Home() {
        const user = localStorage.getItem("user");

        const [Teach, setTeach] = useState("select");
        const [Learn, setLearn] = useState("select");
        const [Same, setSame] = useState(false);
        const [Sel, setSel] = useState(false);
        const [log, setLog] = useState(true);
        const [Description,setDescription] = useState(null)

        const handle = async (e) => {
            e.preventDefault();
            try {
                if(user === null){
                    setLog(false)
                }else{
                    if (Teach === Learn && Teach !== 'select') {
                        setSame(true);
                        setTimeout(() => {
                            setSame(false);
                        }, 3000);
                    } else if (Teach === "select" || Learn === "select") {
                        setSel(true);
                        setTimeout(() => {
                            setSel(false);
                        }, 3000);
                    }else {
                        const response = await axios.post("http://localhost:6000/posts", {
                            username: user,
                            learn: Learn,
                            teach: Teach,
                            description:Description,
                        });
                        if (response.data?.message === "yes") {
                            console.log("Post successful!");
                        }else if(response.data?.message  === "already-there"){
                            console.log("you already have this request!")
                        }else {
                            console.log("Post failed: Server response:", response.data);
                        }
                    }
                }
                
            } catch (error) {
                console.error('An error occurred:', error);
                // Handle the error here, e.g., show a toast message to the user
            }
        };

        return (

            <>
            
            <style>
                {
                    `
                    #btn-1{
                        margin-right:3vw;
                    }
                    
                    nav{
                        display:flex;
                        align-items:center;
                        justify-content:space-between;
                        padding:1vw;
                       
                        background-color:#3F72AF;
                        color:white;
                      
                    }
                    nav a{
                        color:white;
                        list-style:none;
                        text-decoration:none;
                        border:1px solid white;
                        padding:1vw;
                        border-radius:2vw;
                    }
                    nav a:hover{
                        background-color:white;
                        text-decoration:none;
                    }
                    main{
                        background-color:#F9F7F7;
                        color: #0009;
                        padding:3vw;
                    }
                    .form-area{
                        margin-top:3vh;
                    }
                    .inputs{
                        margin-top:5vh;
                        // display:flex;
                        align-items:center;
                        justify-content:space-around;
                    }
                    #btn{
                        border:2px solid #3F72AF;
                        color:#3F72AF;
                        margin-bottom:6vh;
                    }
                    #btn:hover{
                        background-color:#3F72AF;
                        color:white;
                    }
                    .error{
                        color:red;
                        margin-top:2vh;
                        margin-bottom:2vh;
                    }
                    .other{
                        background-color:#DBE2EF;
                    }
                    .card{
                        width:40vw;
                        margin-top:5vh;
                        height:20vh;
                        border-radius:2vw;
                    }
                    .card img{
                        margin-top:2vh;
                        height:12vh;
                        width:20vw;
                       
                    }
                    .welcome{
                        margin-top:4vh;
                        padding:3vw;
                    }
                    .card:hover{
                        cursor:pointer;
                        border-radius:50%;
                    }
                    .categories{
                        display:flex;
                        flex-wrap:wrap;
                        justify-content:space-around;
                        align-items:center;

                    }
                    .theme{
                        color:#3F72AF;
                    }
                    @media(min-width:700px){
                        .inputs{
                            display:flex;
                        }
                        .categories{
                            justify-content:space-evenly;

                        }
                        .card{
                            margin-right:3vw;
                            width:30vw;
                            height:25vh;
                        }
                        .card img{
                            margin-top:5vh;
                        }
                    @media(min-width:950px){
                        .card{
                            margin-right:0;
                            width:20vw;
                            height:25vh;
                        }
                        .card img{
                            height:10vh;
                            width:10vw;
                        }
                        
                    }
                    }
                    @medi(min-width:1200px){
                    .card{
                        widht:15vw;
                    }
                    
                    }
                    `
                }
            </style>
                <nav>
                    <h2>Hello, {user ? user : "User"}!</h2>
                    
                    {user ? <a href="#">Edit Profile</a> : <a href='/reg'>Register</a>}
                </nav>
                <main>
                    <center>
                        <div className="welcome">
                        <h2 className="theme">Welcome To SkillFlix</h2>
                    <p><span className="theme">Give </span> & <span className="theme">Recieve</span> To <span className="theme">Grow!</span></p>
                    </div>
                    <hr />
                    </center>
                    
                
                <div className="form-area">
                   <center><h3 className="theme">Post Your Skill!</h3></center> 
                    <form onSubmit={handle}>
                        <div className="inputs">
                        

                        <div class="form-group">
                            <label htmlFor="learn">What do You Want To <span className="theme">Learn?</span></label>
                            <select class="form-control" name="learn" onChange={(e)=>{setLearn(e.target.value)}}>
                            <option value="select">-Select-</option>
                            <option value="programming">coding</option>
                            <option value="trading">Trading</option>
                            <option value="language">Language</option>
                            <option value="cooking">Cooking</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label htmlFor="teach">What do You Want To <span className="theme" >Teach?</span></label>
                            <select class="form-control" name="teach" onChange={(e)=>setTeach(e.target.value)}>
                            <option value="select">-Select-</option>
                            <option value="programming">coding</option>
                            <option value="trading">Trading</option>
                            <option value="language">Language</option>
                            <option value="cooking">Cooking</option>
                            </select>
                        </div>

                        
                        </div>
                        <div class="form-floating">
                    <label for="description">Description</label>
                        <textarea class="form-control" placeholder="Eg: I can teach Java, for Hindi" name="description" onChange={(e)=>{setDescription(e.target.value)}} ></textarea>
                        </div>

                        <input type="submit" value="Post" id="btn" class="btn btn btn-lg btn-block" />
                        {!log && <center><p className="error">Your Not Loged/Registered</p>
                        <button id="btn-1" class="btn btn-outline-primary" onClick={()=>{window.location.href='/login'}}>Login</button>
                        <button class="btn btn-outline-info" onClick={()=>{window.location.href='/reg'}}>Register</button>
                        </center>}
                        {Same && <center><p className="error">You Can't Swap Same Skills</p></center>}
                        {Sel && <center><p className="error">Select Something!</p></center>}
                        
                    </form>
                    
                </div>
                <hr />
               
                   <h3 className="theme">You Can Explore </h3> 

                   <div className="categories">
                        <div className="card" onClick={()=>{window.location.href="/programming"}}>
                            <center>
                            <img src={progImg} alt="" />
                            <h4>coding</h4>
                            </center>
                        </div>
                        <div className="card" onClick={()=>window.location.href="/language"}>
                            <center>
                            <img src={langImg} alt="" />
                            <h4>Language</h4>
                            </center>
                        </div>
                        <div className="card" onClick={()=>window.location.href="/trading"}>
                            <center>
                            <img src={tradeImg} alt=""/>
                            <h4>Trading</h4>
                            </center>
                        </div>
                        <div className="card" onClick={()=>window.location.href="/cooking"}>
                            <center>
                            <img src={cookImg} alt="" />
                            <h4>Cooking</h4>
                            </center>
                        
                        </div>
                   </div>

                   <hr />
                   <center>
                    <h5 className="theme">Thank You For Visiting!</h5>
                   </center>
                
                </main>
                
                
            </>
        );
    }


export default Home;
