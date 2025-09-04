import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
export default function SignUp(){
const [signUpCredentials, setSignUpCredentials] = useState({
    email:'',
    password:'',
    name:''
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

function handleName(e){
  setSignUpCredentials((prev)=> ( {
      ...prev,
      name:e.target.value
    }
  ))
}
   
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>
        <form className="signup-form" onSubmit={handleSignUp}>
           <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              value={signUpCredentials.name} 
              onChange={handleName} 
              placeholder="Enter your Name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={signUpCredentials.email} 
              onChange={handleEmail} 
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={signUpCredentials.password} 
              onChange={handlePassword} 
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <div className="login-text">
          Already have an account? <a href="/signIn">Sign In</a>
        </div>
      </div>
    </div>
  );
}
