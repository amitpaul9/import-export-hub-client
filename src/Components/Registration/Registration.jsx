import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../Firebase/Firebase.config';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa6';
import { ImportExportHubContext } from '../../../Contexts/importExportHubContext';

const Registration = () => {

    const natigate = useNavigate();

    const { signupUser, signinwithGoogle, setUser } = useContext(ImportExportHubContext);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showpass, setShowpass] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const photo = e.target.photo.value;
        const name = e.target.name.value;
        const term = e.target.terms.checked;
        // console.log(email, password, name, photo);



        // password expresstion
        const lowercase = /^(?=.*[a-z]).+$/;
        const uppercase = /^(?=.*[A-Z]).+$/;
        const passLong = /^.{6,}$/;



        if (!passLong.test(password)) {
            setError("Password must have six charecters")
            return;
        }
        else if (!lowercase.test(password)) {
            setError("Password must contain a lowercase letter");
            return;
        }
        else if (!uppercase.test(password)) {
            setError("Password must contain a uppercase letter");
            return;
        }


        // reset error status 
        setError();
        setSuccess();

        if (!term) {
            setError("Please accept our Term & Condition to Resgister");
            return;
        }

        const profile = {
            displayName: name,
            photoURL: photo,
        }

        signupUser(email, password)
            .then(result => {
                setSuccess(true);
                console.log("afer creating a user", result.user);

                updateProfile(auth.currentUser, profile)
                    .then(() => {
                        setUser(prev => ({ ...prev, ...profile }))
                    })
                    .catch(error => console.log(error))


                    // save user to the database 

                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                }

                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                }).then(res => res.json()).then(data => console.log(data)).catch(error => console.log("got error of", error))



                e.target.reset();
                natigate("/");

            })
            .catch(error => {
                setError("Already have an aacount");
                console.log(error)
            })




    }


    // password show/hide 
    const handleTogglePass = (e) => {
        e.preventDefault();
        setShowpass(!showpass);
    }

    const signupwithGoogle = () => {
        signinwithGoogle()
            .then(res => {
                console.log(res);
                natigate("/");


                // save user to the database 

                const newUser = {
                    name: res.user.displayName,
                    email: res.user.email,
                    image: res.user.photoURL
                }



                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                }).then(res => res.json()).then(data => console.log(data)).catch(error => console.log("got error of", error))
            })
            .catch(err => console.log(err))
    }



    return (
        <div className=" min-h-screen text-black ">
            <title>Registration-Import Export Hub</title>
            <div className="flex justify-center flex-col items-center">
                <div className="text-center mt-8">
                    <h1 className="text-3xl w-sm md:w-3xl lg:w-4xl bg-white p-3 rounded-2xl font-bold mb-2">Resgitration</h1>
                </div>
                <div className="card bg-white md:w-3xl w-sm lg:w-4xl shrink-0 shadow-sm">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                {/* NAme  */}
                                <label className="label">Name</label>
                                <input
                                    type="text"
                                    className="input bg-white w-full"
                                    placeholder='Your Name'
                                    name="name"
                                />
                                {/* photo url  */}
                                <label className="label">Photo URL</label>
                                <input
                                    type="text"
                                    className="input bg-white w-full"
                                    placeholder='Your Photo URL'
                                    name="photo"
                                />
                                {/* email  */}
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    className="input bg-white w-full"
                                    placeholder='Your Email'
                                    name="email"
                                />
                                {/* password  */}
                                <label className="label">Password</label>
                                <div className="relative">
                                    <input
                                        type={showpass ? "text" : "password"}
                                        className="input bg-white w-full"
                                        placeholder='Password'
                                        name="password"
                                    />
                                    <div
                                        onClick={handleTogglePass}
                                        className="absolute top-3.5 right-1"
                                    >
                                        {showpass ? <FaRegEyeSlash className='w-[70px]' /> : <FaEye className='w-[70px]' />}
                                    </div>
                                </div>

                                <div>
                                    <label className="label ">
                                        <input
                                            type="checkbox"
                                            name="terms"
                                            className="checkbox-xs text-black  border-black"
                                        />
                                        Accept term and condition
                                    </label>
                                </div>
                                {success && (
                                    <p className="text-green-500">Account Create successfully</p>
                                )}
                                {error && <p className="text-red-500">{error}</p>}
                                <button className="btn  mt-4 bg-gradient-to-r  from-gray-900 to-indigo-900 text-white  ">Register</button>
                            </fieldset>

                        </form>
                        <button className="btn bg-white text-black border-[#e5e5e5]" onClick={signupwithGoogle}>
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Sign Up with Google
                        </button>
                        <p>
                            Already have an Account?
                            <Link to="/login" className="text-[#344e41] ml-2 underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;