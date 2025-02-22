import React, { useContext } from "react";
import { ContextMain } from "../Context/ContextApi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const Register = () => {
  const { handleEmailSignIn, validatePassword } = useContext(ContextMain);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log("User Info:", data);
    const name = data.name;
    const photo = data.PhotoUrl;
    console.log(name, photo);
    handleEmailSignIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(result);
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          //User create Operation: method post hit in this localpath
          // fetch("https://sever-silde.vercel.app/users", {
          //   method: "POST", //user create method
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify(user),
          // })
          //   .then((res) => res.json())
          //   .then((data) => {
          //     console.log(data);
          //     if (data.insertedId) {
          //       //toast.success("User add in DataBase");
          //     }
          //   });
          toast.success("SignIn SuccessFully");
          navigate("/");
        });
      })
      .catch((error) => {
        toast.error("This Id Already Exist");
      });
  };
  const navigate = useNavigate();

  return (
    <>
      <h1 className="lg:text-5xl md:text-2xl text-lg text-center my-5 ">
        Register Page
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-screen-sm lg:mx-auto md:mx-auto bg-gradient-to-tr  from-purple-500/50 to-blue-200 rounded-lg py-[5rem] px-[2rem] mt-[5rem] mx-5">
          <div className="">
            <label className="label"></label>
            <input
              type="text"
              placeholder="Photo Url"
              className="input input-bordered w-full focus:bg-gray-200/50 focus:text-white focus:font-semibold focus:text-lg"
              {...register("PhotoUrl")}
            />
          </div>
          <div className="lg:flex md:flex my-[1.5rem] justify-evenly w-full">
            <div className="form-control my-8">
              <label className="label"></label>
              <input
                type="text"
                placeholder="UserName"
                className="input input-bordered focus:bg-gray-200/50 focus:text-white focus:font-semibold focus:text-lg  lg:w-[16rem] md:w-[16rem]"
                {...register("name", { required: true })}
              />
              {errors.name && <span className="block">Name is required</span>}
            </div>
            <div className="form-control my-8">
              <label className="label"></label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered focus:bg-gray-200/50 focus:text-white focus:font-semibold  focus:text-lg lg:w-[18rem] md:w-[18rem] "
                {...register("email", { required: true })}
              />
              {errors.name && <span className="block">Email is required</span>}
            </div>
          </div>
          <div className="form-control">
            <label className="label"></label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered focus:bg-gray-200/50 focus:text-white focus:font-semibold w-full focus:text-lg"
              name="password"
              {...register("password", {
                require: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
              })}
            />
            {errors.password?.type === "pattern" && (
              <span className="block">
                Password must be 6 Characters with Capital and special Case
              </span>
            )}
          </div>
          <div className="flex justify-center mt-[2rem]">
            <button
              type="submit"
              className="bg-purple-600/50 px-5 py-2 rounded-xl text-lg text-white font-bold hover:bg-purple-500/50"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
