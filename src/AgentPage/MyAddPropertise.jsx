import React, { useContext, useEffect, useState } from "react";
import { ContextMain } from "../Context/ContextApi";
import UseSecureApi from "../Custom/UseSecureApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyAddedProperties = () => {
  const { user } = useContext(ContextMain);
  const [properties, setProperties] = useState([]);
  const SecureApi = UseSecureApi();
  const navigate = useNavigate();

  useEffect(() => {
    SecureApi.get(`/properties/${user?.email}`)
      .then((res) => {
        setProperties(res.data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, [user]);

  const handleDelete = (id) => {
    SecureApi.delete(`/properties/${id}`)
      .then(() => {
        toast.success("Property deleted successfully!");
        setProperties((prev) => prev.filter((prop) => prop._id !== id));
      })
      .catch((error) => console.error("Error deleting property:", error));
  };

  const handleUpdate = (id) => {
    navigate(`/update-property/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">My Added Properties</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold mt-2">{property.title}</h2>
            <p className="text-gray-600">Location: {property.location}</p>
            <p className="text-gray-600">Agent: {property.agentName}</p>
            <p className="text-gray-600">
              Price Range: ${parseInt(property?.price)}
            </p>
            <p
              className={`font-semibold ${
                property.status === "verified"
                  ? "text-green-500"
                  : property.status === "rejected"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              Status:{" "}
              {property.status.charAt(0).toUpperCase() +
                property.status.slice(1)}
            </p>
            <div className="mt-4 flex gap-2">
              {property.status !== "rejected" && (
                <button
                  onClick={() => handleUpdate(property._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                >
                  Update
                </button>
              )}
              <button
                onClick={() => handleDelete(property._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedProperties;
