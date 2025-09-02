import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ use navigate instead

  useEffect(() => {
async function fetchHome () {
try{
const token = localStorage.getItem("token");
if(!token){
    navigate("/");
    return
}
const res = await fetch("http://localhost:8004/home", {
    headers:{
        "Authorization": `Bearer ${token}`
 } })

    if(!res.ok){
        throw new Error("Unauthorized or expired token")
    }
const data = await res.json();
setMessage(data.message)
}catch(err){
setError(err.message)
}
}
fetchHome()
  }, [navigate]);

   const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

    return (
    <div>
      
      {message && <h2>{message}</h2>}
      {error && <h2 style={{ color: "red" }}>{error}</h2>}

      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}