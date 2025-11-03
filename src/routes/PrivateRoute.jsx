import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    if(loading){
        return <p>Please Wait Few moment........!!!!!!</p>
    }
    if(!user){
        return <Navigate to={'/login'}></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;