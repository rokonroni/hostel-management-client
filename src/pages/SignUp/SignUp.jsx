import { Helmet } from "react-helmet-async";
import Logo from "../../assets/logo.png";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { signUp, updateUserProfile } = useAuth();

  const onSubmit = (data) => {
    signUp(data.email, data.password).then(() => {
      updateUserProfile(data.name, data.photoURL).then(() => {
        const userInfo = {
          name: data.name,
          email: data.email,
          role: "user",
          package: "Bronze",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              title: "User Created Successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
            navigate("/");
          }
        });
      });
    });
  };

  return (
    <>
      <Helmet>
        <title>Hostel Management | Sign Up</title>
      </Helmet>

      <div className="flex w-full max-w-sm mt-10 mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1554009975-d74653b879f1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsfGVufDB8MXwwfHx8MA%3D%3D")',
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
            <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
              or login with email
            </span>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                {...register("name", { required: true })}
                placeholder="Enter your full name"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.name && (
                <span className="text-red-600 mt-2 ">*Name is required</span>
              )}
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Photo URL
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="Enter your Photo URL"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.photoURL && (
                <span className="text-red-600 mt-2 ">
                  *Photo URL is required
                </span>
              )}
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="Enter your email address"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.photoURL && (
                <span className="text-red-600 mt-2 ">
                  *Photo URL is required
                </span>
              )}
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
                type="password"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                })}
                placeholder="Enter your password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              />

              {errors.password?.type === "required" && (
                <span className="text-red-600 mt-2 ">
                  *Password is required
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600 mt-2 ">
                  *Password must be 8 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600 mt-2 ">
                  *Password must be less then 20 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600 mt-2 ">
                  *Minimum eight characters, at least one letter, one number and
                  one special character
                </span>
              )}
            </div>
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="w-full px-6 py-3 text-sm font-medium  text-white bg-blue-800 rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 focus:outline-none focus:underline hover:underline"
            >
              Sign in
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
