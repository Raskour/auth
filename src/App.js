import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignUp/>}/>
           <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
 
     
  );
}

export default App;
