

import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router";

const Register = () => {

    const { createUser, signinWithGoogle } = useContext(AuthContext)
    const handleCreateUser = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);

        createUser(email, password)
            .then(current => {
                console.log(current.user);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleSigninWithGoogle = () => {
        signinWithGoogle()
            .then((result) => {
                console.log(result.user);
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
                    Register Now!
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Already have an account?{" "}
                    <Link to='/login' className="text-[#632EE3] font-semibold hover:underline">
                        Login Now
                    </Link>
                </p>

                {/* Form */}
                <form onSubmit={handleCreateUser} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Image-URL"
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
                        Register
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <p className="px-3 text-gray-400 text-sm">OR</p>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Google Button */}
                <button onClick={handleSigninWithGoogle}
                    type="button"
                    className="btn btn-outline w-full flex items-center justify-center gap-2"
                >
                    <FcGoogle className="text-xl" />
                    Sign Up With Google
                </button>
            </div>
        </div>
    );
};

export default Register;
