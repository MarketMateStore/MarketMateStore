import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from 'react-icons/fa';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

function Login(e) {
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setpasswordInput] = useState();
  const [check, setCheck] = useState([]);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const handleGoogleLoginSuccess = (response) => {
    console.log('Google login success:', response);
    navigate('/')
  };
  function handelSignIn(e) {
    e.preventDefault();
    setCheck(JSON.parse(localStorage.getItem("infoUser")));

    if (localStorage.dataUser != null) {
      if (!localStorage.dataUser.includes(emailInput)) {
        alert(`seems like you dont have account ,sign up now`);
      }
      if (localStorage.dataUser.includes(emailInput)) {
        localStorage.setItem("userSignIn", emailInput);
        alert("welcome");
      }
    }
  }

  return (
    <div>
      <section className="flex flex-col md:flex-row h-screen items-center mt-5">


        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Log in to your account
            </h1>

            <form className="mt-6" action="#" method="POST">
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-amber-300 focus:amber-300 focus:outline-none   focus:bg-white"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
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
                  value={passwordInput}
                  onChange={(e) => setpasswordInput(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full block bg-neutral-900   hover:bg-neutral-900 focus:bg-neutral-900 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
                onClick={(e) => handelSignIn(e)}
              >
                Log In
              </button>
              {/*onClick={(e)=>handelclick(e)} */}
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
                // icon={<FaFacebook />}
                cssClass="facebook-button"
              />
            </div>
            <p className="mt-8">
              Need an account?{" "}
              <a className="text-blue-500 hover:text-blue-700 font-semibold">
                <Link to="/signup">Create an account</Link>
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
