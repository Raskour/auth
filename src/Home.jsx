import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

export default function Home({token, setToken}) {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
   // const token = useAuth(); //check token existence
    

    useEffect(() => {
              
        async function fetchHome() {
      
            try {
                const res = await fetch("http://localhost:8004/home", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                if (!res.ok) {
                    throw new Error("Unauthorized or expired token")
                }
                const data = await res.json();
                setMessage(data.message)
            } catch (err) {
                setError(err.message)
            }
        }
        fetchHome()
    }, [navigate, token]);

    if (!token) {
        return <Navigate to ="/signIn"/>
    }

    const handleLogout = () => {
        // localStorage.removeItem("token");
        setToken(null)
        navigate("/signIn");
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