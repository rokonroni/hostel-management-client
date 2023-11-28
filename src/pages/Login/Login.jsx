import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";
// import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
  const [disable, setDisable] = useState(true);
  const [userCaptcha, setUserCaptcha] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleValidation = () => {
    const isValidCaptcha = validateCaptcha(userCaptcha);
    setDisable(!isValidCaptcha);
  };
  const handleCaptchaChange = (e) => {
    setUserCaptcha(e.target.value);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log();
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password).then(() => {
      Swal.fire({
        title: "Succecessfully login!",
        text: "Welcome to our Restaurant!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate(from, { replace: true });
    });
  };
  return (
    <>
      <Helmet>
        <title>Hostel Management | Login</title>
      </Helmet>

      <div className="flex w-full max-w-sm mt-10 mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage:
        'url("https://images.unsplash.com/photo-1554009975-d74653b879f1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsfGVufDB8MXwwfHx8MA%3D%3D")'
    }}
        />
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={Logo} />
          </div>
          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>
          <SocialLogin />
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4" />
            <span
            
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400"
            >
              or login with email
            </span>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4" />
          </div>
         <form onSubmit={handleSignIn}>
           <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              name="email"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="loggingPassword"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
              >
                Forget Password?
              </a>
            </div>
            <input
              id="loggingPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              name="password"
            />
          </div>
          <div className="relative">
            <label className="label">
              <LoadCanvasTemplate />
            </label>
            <input
              onChange={handleCaptchaChange}
              type="text"
              name="captcha"
              placeholder="Enter the text above"
              className="input w-full input-bordered"
              required
            />
            <button onClick={handleValidation}>
              <TiTick className="absolute right-[3%] text-3xl top-[66%]" />
            </button>
          </div>
          <div className="mt-6">
            <button
              disabled={disable}
              className="w-full px-6 py-3 text-sm font-medium  text-white bg-blue-800 rounded-lg hover:bg-blue-700"
              type="submit"
            >
              Sign In
            </button>
          </div>
         </form>
          <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <Link to='/signup' className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</Link>.</p>
        </div>
      </div>
    </>
  );
};

export default Login;
