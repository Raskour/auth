import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
export default function SignUp(){
const [signUpCredentials, setSignUpCredentials] = useState({
    email:'',
    password:''
})
const navigate = useNavigate()

    async function handleSignUp(e){
        e.preventDefault()
        try{
        const res = await fetch("http://localhost:8004/signUp",{
        method: 'POST',
        headers:  {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(signUpCredentials)
        
    });
    const data = await res.json();
    if(!res.ok){
        
        alert(data.error || "Something went wrong");
        return;
    }
        alert(data.message)
        navigate("/signIn")
        }catch(err){
            console.error('Error adding the user', err);
            alert("Error adding the user")
        } }
        
function handleEmail(e){
setSignUpCredentials((prev) => ({
    ...prev,
    email: e.target.value
}))
}

function handlePassword(e){
    setSignUpCredentials((prev) => ({
    ...prev,
    password: e.target.value
    }))
}

    return(
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSignUp}>
                <label>Email</label>
                <input type="email" value={signUpCredentials.email} onChange={handleEmail}/>
                <div>
                <label>Password</label>
                <input type="password"value={signUpCredentials.password} onChange={handlePassword}/>
                </div>
               <button >Create Account</button>
            </form>
        </div>
    )
}