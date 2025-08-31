import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div>
            <h1>Welcome</h1>
            <h2>You are successfully Logged in</h2>
            <div>
                <Link to='/'>Logout</Link>
            </div>
        </div>
    )
}