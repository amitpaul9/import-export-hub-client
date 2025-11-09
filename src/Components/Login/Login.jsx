import React, { useContext, useRef, useState } from 'react';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../Firebase/Firebase.config';
import { toast } from 'react-toastify';
import { ImportExportHubContext } from '../../../Contexts/importExportHubContext';


const Login = () => {
    const [showpass, setShowpass] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const { signInUser, signinwithGoogle } = useContext(ImportExportHubContext);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)

    const emailref = useRef();

    // password toggling 
    const handleTogglePass = (event) => {
        event.preventDefault();
        setShowpass(!showpass);
    };

    // login 
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result.user)
                setSuccess(true);
                e.target.reset();
                navigate(location.state || '/');
            })
            .catch(error => {
                setError("Wrong email or password");
                console.log(error.message);
            })
    }

    const handleForgetPassword = () => {
        const email = emailref.current.value;
        sendPasswordResetEmail(auth, email)
            .then(res => {
                toast.success("Password reset email send successfully");
                console.log(res);
            })
            .catch(error => console.log(error.message))
    }

    const signupwithGoogle = () => {
        signinwithGoogle()
            .then(res => {
                console.log(res);
                navigate(location.state || '/');
            })
            .catch(err => console.log(err))
    }



    return (
        <div className=''>
            <div className=" min-h-screen text-black ">
                <title>Login-GreenNest</title>
                <div className="flex justify-center flex-col items-center">
                    <div className="text-center mt-8">
                        <h1 className="text-3xl w-4xl bg-white p-3 rounded-2xl font-bold mb-2">Login</h1>
                    </div>
                    <div className='flex  px-7 py-9 rounded-xl w-4xl justify-center gap-3 bg-white shadow-sm'>
                        <div className=" w-full max-w-sm shrink-0 ">
                            <div className="card-body">
                                <form onSubmit={handleLogin}>
                                    <fieldset className="fieldset">
                                        {/* email  */}
                                        <label className="label">Email</label>
                                        <input
                                            type="email"
                                            className="input bg-white"
                                            ref={emailref}
                                            name="email"
                                        />
                                        {/* password  */}
                                        <label className="label">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showpass ? "text" : "password"}
                                                className="input bg-white"

                                                name="password"
                                            />
                                            <div
                                                onClick={handleTogglePass}
                                                className="absolute top-3.5 right-1"
                                            >
                                                {showpass ? <FaRegEyeSlash className='w-[70px]' /> : <FaEye className='w-[70px]' />}
                                            </div>
                                        </div>

                                        <div onClick={handleForgetPassword}>
                                            <Link className='underline' to="https://mail.google.com/mail/u/0/#inbox" target="_blank">Forget Password?</Link>
                                        </div>
                                        {success && (
                                            <p className="text-green-500">Account Create successfully</p>
                                        )}
                                        {error && <p className="text-red-500">{error}</p>}
                                        <button className="btn mt-4 bg-[#F4CF89] ">Login</button>
                                    </fieldset>

                                </form>
                                <button className="btn bg-white text-black border-[#e5e5e5]" onClick={signupwithGoogle}>
                                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Login with Google
                                </button>
                                <p>
                                    Not yet Registered?
                                    <Link to="/register" className="text-[#344e41] ml-2 underline">
                                        Register
                                    </Link>
                                </p>
                            </div>

                        </div>
                        <img className='max-w-sm rounded-2xl' src="/public/assets/loginpic.png" alt="" />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Login;