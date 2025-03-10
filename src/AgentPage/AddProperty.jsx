import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ContextMain } from "../Context/ContextApi";
import { toast } from "react-toastify";
import UseSecureApi from "../Custom/UseSecureApi";
// Adjust the path based on your setup

const AddProperty = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useContext(ContextMain);
  const SecureApi = UseSecureApi();
  const Image_Hosting = import.meta.env.VITE_Image_Hosting_Key;
  const Image_Hosting_Api = `https://api.imgbb.com/1/upload?&key=${Image_Hosting}`;
  const onSubmit = async (data) => {
    const ImageFile = {
      image: data.image[0],
    };
    const res = await SecureApi.post(Image_Hosting_Api, ImageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const propertyData = {
      ...data,
      agentName: user?.name,
      agentEmail: user?.email,
      image: res.data.data.display_url,
      status: "pending",
    };
    SecureApi.post("/properties", propertyData)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success("Property added successfully!");
          reset();
        }
      })
      .catch((error) => console.error("Error adding property:", error));
  };

  return (
    <div className="max-w-xl my-14 mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Property Title */}
        <div>
          <label className="block font-medium">Property Title</label>
          <input
            type="text"
            {...register("title", { required: "Property title is required" })}
            className="w-full p-2 border rounded-md"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Property Location */}
        <div>
          <label className="block font-medium">Property Location</label>
          <input
            type="text"
            {...register("location", {
              required: "Property location is required",
            })}
            className="w-full p-2 border rounded-md"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Property Image Upload */}
        <div>
          <label className="block font-medium">Property Image</label>
          <input
            type="file"
            {...register("image", { required: "Please upload an image" })}
            className="w-full p-2"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Agent Name (Readonly) */}
        <div>
          <label className="block font-medium">Agent Name</label>
          <input
            type="text"
            value={user?.name || ""}
            className="w-full p-2 border rounded-md bg-gray-100"
            readOnly
          />
        </div>

        {/* Agent Email (Readonly) */}
        <div>
          <label className="block font-medium">Agent Email</label>
          <input
            type="email"
            value={user?.email || ""}
            className="w-full p-2 border rounded-md bg-gray-100"
            readOnly
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block font-medium">Price Range ($)</label>
          <input
            type="number"
            {...register("price", {
              required: "Price range is required",
              min: 1,
            })}
            className="w-full p-2 border rounded-md"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
