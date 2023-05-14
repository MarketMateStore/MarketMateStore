import React, { useState, useEffect, createContext, useContext } from "react";
import './login.css'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [info, setInfo] = useState([]);
    const [userSignUp, setUserSignUp] = useState(false);
    const [googleUser, setGoogleUser] = useState({});
    const [pemail, setpEmail] = useState("pvalidate");
    const [pname, setpName] = useState("pvalidate");
    const [ppassword, setPpassword] = useState("pvalidate");
    const navigate = useNavigate();
    const handleGoogleLoginSuccess = (response) => {
        console.log('Google login success:', response);
        navigate('/')
    };

    function UserValidate(string) {
        let pattern = /\s/g;
        return !pattern.test(string);
    }
    function PassWordValidate(string) {
        let pattern =
            /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;
        return pattern.test(string);
    }
    function emailValidate(string) {
        let pattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
        return pattern.test(string);
    }

    const [saveToLocal, setLocal] = useState([info]);
    useEffect(() => {
        if (localStorage.dataUser != null) {
            setInfo(JSON.parse(localStorage.getItem("dataUser")));

        }
    }, []);

    function handelSubmit(e) {
        e.preventDefault();
        if (!emailValidate(email)) {
            setpEmail("pWrong");
        }
        if (!UserValidate(name)) {
            setpName("pWrong");
        }
        if (!PassWordValidate(password)) {
            setPpassword("pWrong");
        }
        if (
            emailValidate(email) &&
            UserValidate(name) &&
            PassWordValidate(password)
        ) {
            setUserSignUp(true);
            const user = { name, email, password };
            const data = [info, user];
            setInfo(data);
            localStorage.setItem("dataUser", JSON.stringify(info));
            navigate("/");
        }
    }
    if (localStorage.dataUser) {
        if (
            localStorage.dataUser.includes(email) &&
            !localStorage.dataUser.includes(" ")
        ) {
        }
    }

    function handelSignOut(e) {
        setGoogleUser({});
        document.getElementById("signInDiv").hidden = false;
    }
    return (
        <div>
            {" "}
            <section className="flex flex-col md:flex-row h-screen items-center mt-[1rem]">
                <div
                    className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center"
                >
                    <div className="w-full h-100">
                        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
                            Create an acoount            </h1>

                        <form className="mt-6" action="#" method="POST">
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="full name "
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-amber-300 focus:amber-300 focus:outline-none   focus:bg-white"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    placeholder="Enter your email "
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-amber-300
                  focus:bg-white focus:outline-none"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name=""
                                    id=""
                                    placeholder="Enter Password"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-amber-300
                  focus:bg-white focus:outline-none"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full block bg-neutral-900  hover:bg-neutral-900 focus:bg-neutral-900 text-white font-semibold rounded-lg
                px-4 py-3 mt-6 signupBtn"
                                onClick={(e) => {
                                    handelSubmit(e);
                                }}
                            >
                                sign up{" "}
                            </button>

                            <div id="signInDiv"></div>
                            {Object.keys(googleUser).length !== 0 && (
                                <button onClick={(e) => handelSignOut(e)}>Sign out</button>
                            )}
                            {googleUser && (
                                <div>
                                    <img src={googleUser.picture} />
                                </div>
                            )}
                        </form>
                        <div className='mt-4'>
                            <GoogleLogin
                                clientId="131293938195-2k0p6ft4jn16fqf2nknb7t8iihfsk1id.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={handleGoogleLoginSuccess}

                            />
                            <br /> <br />
                            <FacebookLogin
                                appId="189266677360423"

                                onSuccess={handleGoogleLoginSuccess}
                                callback={handleGoogleLoginSuccess}
                                // icon="fa-facebook"
                                cssClass="facebook-button"


                            />
                        </div>
                        <p className="mt-8">
                            Already have account?{" "}
                            <a className="text-blue-500 hover:text-blue-700 font-semibold">
                                <Link to="/Login">Login</Link>
                            </a>

                        </p>

                    </div>
                </div>

            </section>
        </div>
    );
}

export default Signup;