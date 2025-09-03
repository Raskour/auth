import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import Home from './Home';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(null)
  return (
    <Router>
      <Routes>
        <Route path='/signIn' element={<LoginForm setToken={setToken}/>}/>
        <Route path='/signup' element={<SignUp/>}/>
           <Route path='/' element={<Home token={token} setToken={setToken}/>}/>
      </Routes>
    </Router>
 
     
  );
}

export default App;
