import {  useState } from "react";

export default function useAuth(){
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') // we used the logic inside the useState, because we wanted it to initalize the value with the token 
        // otherwise it will render null token for the first rener which can break the logic. so if we are intializing the variable whose value 
        // is unknown in the start, do with calling anonymous function.
    });

//     useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//    setToken(storedToken)

//     }, []);

    return token;
}