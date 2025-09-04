import { useState} from "react"
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm({setToken}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    

    //env variables
    // const validEmail = process.env.REACT_APP_EMAIL;
    // const validPassword = process.env.REACT_APP_PASSWORD;
    function handleEmail(e){
setEmail(e.target.value)
    }

function handlePassword(e){
setPassword(e.target.value)
}

// function handleLogin(e){
//     e.preventDefault()
//     if(email=== '' || password === ''){
//         setError('Please fill in the required fields');
//         return;
//     }
//     if(password === validPassword && email === validEmail){
// navigate('/home')
//  }else{
// setError("Invalid Credentials")
//  }
//}

async function  handleLogin(e){
    e.preventDefault();
    try{
  const res = await fetch("http://localhost:8004/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify({ email,password })
  });

  const data = await res.json();
  console.log({data})

  if(res.ok){
    
    //save token to localstorage to use it later
    // localStorage.setItem("token", data.accessToken)

    setToken(data.accessToken) //for storing the data in state in browser memory

    navigate('/')

  }else{
    throw new Error(data.message)
  }

    } catch(error){
        setError(error.message)
    }
  
    
}
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Sign In</h1>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}