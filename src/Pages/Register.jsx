import React, { useContext } from "react";
import { ContextMain } from "../Context/ContextApi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import UsePublicApi from "../Custom/usePublicApi";
import UseSecureApi from "../Custom/UseSecureApi";

const Register = () => {
  const { handleEmailSignIn, wait, setWait } = useContext(ContextMain);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const SecureApi = UseSecureApi();
  const PublicApis = UsePublicApi();
  const Image_Hosting = import.meta.env.VITE_Image_Hosting_Key;
  const Image_Hosting_Api = `https://api.imgbb.com/1/upload?&key=${Image_Hosting}`;
  const onSubmit = async (data) => {
    console.log("User Info:", data);
    const ImageFile = {
      image: data.PhotoUrl[0],
    };
    const res = await SecureApi.post(Image_Hosting_Api, ImageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    const name = data.name;
    const photo = res.data.data.display_url;
    handleEmailSignIn(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        console.log(result);
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        }).then(async () => {
          //User create Operation: method post hit in this localpath
          const userInfo = {
            name: name,
            email: data.email,
            photo: photo,
          };
          PublicApis.post("/users", userInfo).then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              toast.success("User Created Successfully");
            }
          });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-screen-sm lg:mx-auto md:mx-auto bg-gradient-to-tr  from-purple-500/50 to-blue-200 rounded-lg py-8 px-[2rem] mt-[5rem] mx-5">
          <h1 className="lg:text-5xl md:text-2xl text-white text-lg text-center my-5 ">
            Register Page
          </h1>
          <div className="lg:flex md:flex my-12 justify-evenly w-full">
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
          <div className="form-control lg:flex gap-2 justify-center">
            <label className="label"></label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered focus:bg-gray-200/50 focus:text-white focus:font-semibold w-1/2 focus:text-lg"
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
            <div className="w-1/2 mt-4 lg:mt-0">
              <label className="label"></label>
              <input
                type="file"
                className="file-input file-input-ghost"
                {...register("PhotoUrl")}
              />
            </div>
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
