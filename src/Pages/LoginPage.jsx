import React from "react";

const LoginPage = () => {
  return (
    <>
      <h1 className="lg:text-5xl md:text-2xl text-lg text-center my-5 ">
        Loging Page
      </h1>
      <div className="max-w-5xl h-[25rem]  rounded-3xl mx-auto flex justify-center gap-[2rem] items-center mt-[5rem] bg-gradient-to-bl to-sky-400  from-orange-400 p-12 w-full">
        <div>
          <div>
            <img
              src="https://i.ibb.co.com/Q3pRXzSK/images-1.jpg"
              alt=""
              className="w-fullh-[20rem] object-cover object-center"
            />
          </div>
        </div>
        <div>
          {/* Login Section  */}
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
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
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
