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
                console.log({data})
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
    <div className="home-page">
      <header className="home-header">
        <h1> {message && <p className="home-message">{message}</p>}
        {error && <p className="home-error">{error}</p>}</h1>
        <button className="home-btn" onClick={handleLogout}>Logout</button>
      </header>

      <main className="home-main">
       

        <section className="home-section">
          <h2>Getting Started</h2>
          <p>
            Here you can manage your account, check your notifications, and explore all the features available to you. Use the navigation menu to access different sections of your application.
          </p>
        </section>

        <section className="home-section">
          <h2>Quick Actions</h2>
          <ul>
            <li>Update your profile</li>
            <li>Check your recent activity</li>
            <li>Explore new features</li>
          </ul>
        </section>
      </main>
    </div>
  );
}