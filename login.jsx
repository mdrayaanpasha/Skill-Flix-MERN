import { useState } from "react"
import axios from 'axios'



function Login(){
    const [user,setuser]=useState('');
    const [pass,setpass]=useState('');
    const [wrong,setwrong]=useState(false);
    const [exist,setexist]=useState(false);
    const handleform = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login",{
            username:user,
            password:pass
        })
        if(response.data.message === "authenticated"){
            localStorage.setItem("user",user);
            localStorage.setItem("id",response.data.userId)
            window.location.href = '/home'
        }else if(response.data.message === "wrong password"){
            setwrong(true);
        }else{
            setexist(true)
        }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <p>Hello</p>
        <form onSubmit={handleform}>
            <input type="text" name="name" onChange={e=>setuser(e.target.value)} id="" />
            <input type="text" name="password" onChange={e=>setpass(e.target.value)} id="" />
            <input type="submit" value="Login" />
        </form>
        {exist && <p> User Doesnt Exist!</p>}
        {wrong && <p> Wrong Password</p>}
        </>
    )
}


export default Login