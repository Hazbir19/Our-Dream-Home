import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";

import { useForm } from "react-hook-form";
import { ContextMain } from "../Context/ContextApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginPage = () => {
  const navigate = useNavigate();
  const { HandleLogIn, HandleGoogleSignIn } = useContext(ContextMain);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    HandleLogIn(data.email, data.password).then((res) => {
      if (res) {
        toast.success("Login Success");
        navigate("/");
      }
    });
  };
  return (
    <>
      <h1 className="lg:text-5xl md:text-2xl text-lg text-center my-5 ">
        LogIn Page
      </h1>
      <div className="lg:max-w-5xl  rounded-3xl lg:mx-auto lg:flex gap-5 justify-center lg:gap-[2rem] items-center mt-[5rem] bg-gradient-to-bl to-sky-400  from-orange-400 lg:p-12 p-8 mx-3 lg:w-full ">
        <div>
          <div className="flex justify-center my-8">
            <img
              src="https://i.ibb.co.com/Q3pRXzSK/images-1.jpg"
              alt=""
              className="lg:w-full lg:h-[20rem]  object-cover object-center"
            />
          </div>
        </div>
        <div>
          {/* Login Section  */}
          <div className="card bg-base-100 w-full lg:max-w-sm lg:shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", {
                    required: true,
                  })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", {
                    require: true,
                  })}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="flex justify-evenly items-center">
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </div>
              <div
                className="mt-4 p-2 rounded-2xl shadow-xl cursor-pointer"
                onClick={HandleGoogleSignIn}
              >
                <button className="lg:text-3xl md:text-xl text-lg">
                  <FcGoogle></FcGoogle>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
