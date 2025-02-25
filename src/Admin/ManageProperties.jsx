import React, { useContext, useEffect, useState } from "react";
import { ContextMain } from "../Context/ContextApi";
import UseSecureApi from "../Custom/UseSecureApi";

const ManageProperties = () => {
  const { user } = useContext(ContextMain);
  const [properties, setProperties] = useState([]);
  const SecureApi = UseSecureApi();
  useEffect(() => {
    SecureApi.get("/properties")
      .then((res) => {
        setProperties(res.data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);
  const handleVerify = (id) => {
    SecureApi.patch(`/properties/${id}/verify`).then(() => {
      setProperties((prev) =>
        prev.map((property) =>
          property._id === id ? { ...property, status: "verified" } : property
        )
      );
    });
  };

  const handleReject = (id) => {
    SecureApi.patch(`/properties/${id}/reject`).then(() => {
      setProperties((prev) =>
        prev.map((property) =>
          property._id === id ? { ...property, status: "rejected" } : property
        )
      );
    });
  };

  return (
    <>
      <div>
        <h1 className="text-xl">Manage Properties</h1>
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Manage Properties</h1>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Title</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Agent</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property._id} className="text-center">
                  <td className="border p-2">{property.title}</td>
                  <td className="border p-2">{property.location}</td>
                  <td className="border p-2">{property.agentName}</td>
                  <td className="border p-2">{property.agentEmail}</td>
                  <td className="border p-2">${property.price}</td>
                  <td className="border p-2 font-bold">
                    {property.status === "pending" && (
                      <span className="text-amber-400">pending</span>
                    )}
                    {property.status === "verified" && (
                      <span className="text-green-500">Verified</span>
                    )}
                    {property.status === "rejected" && (
                      <span className="text-red-500">Rejected</span>
                    )}
                  </td>
                  <td className="border p-2">
                    {property.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleVerify(property._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-700"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleReject(property._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageProperties;
