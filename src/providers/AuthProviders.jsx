import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase/firebase.config";
import { useEffect, useState } from "react";

const provider = new GoogleAuthProvider();
const AuthProviders = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signinWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const authInfo = {
        createUser,
        signInUser, 
        logout,
        user,
        loading, 
        signinWithGoogle
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProviders;