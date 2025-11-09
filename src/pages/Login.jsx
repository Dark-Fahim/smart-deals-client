import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import AuthContext from "../context/AuthContext";

const Login = () => {

    const { signInUser, signinWithGoogle } = useContext(AuthContext)
    const handleSignIn = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(currentUser => {
                console.log(currentUser.user);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleSigninWithGoogle = () => {
        signinWithGoogle()
            .then((result) => {
                console.log(result.user);
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                }
                fetch('https://smart-deals-server-three-alpha.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)

                })
                .then(res => res.json())
                .then(data => {
                    console.log('data after user save', data);
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
                    Welcome Back!
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Don’t have an account?{" "}
                    <Link to='/register' className="text-[#632EE3] font-semibold hover:underline">
                        Register Now
                    </Link>
                </p>

                {/* Form */}
                <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Gradient Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg text-white font-semibold 
                       bg-gradient-to-r from-[#632EE3] to-[#9F62F2] 
                       hover:opacity-90 transition-all duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Forgot password */}
                <div className="text-right mt-3">
                    <a
                        href="#"
                        className="text-sm text-[#632EE3] hover:underline font-medium"
                    >
                        Forgot Password?
                    </a>
                </div>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <p className="px-3 text-gray-400 text-sm">OR</p>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Google Button */}
                <button
                    onClick={handleSigninWithGoogle}
                    type="button"
                    className="btn btn-outline w-full flex items-center justify-center gap-2"
                >
                    <FcGoogle className="text-xl" />
                    Continue With Google
                </button>
            </div>
        </div>
    );
};

export default Login;
