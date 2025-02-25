import React, { useEffect, useState, useContext } from "react";
import { ContextMain } from "../Context/ContextApi";
import UseSecureApi from "../Custom/UseSecureApi";

const PropertyBought = () => {
  const { user } = useContext(ContextMain);

  const SecureApi = UseSecureApi();
  const [boughtProperties, setBoughtProperties] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    SecureApi.get(`/property/Priceoffer/${user?.email}`)
      .then((res) => {
        console.log(res.data);
        setBoughtProperties(res.data);
      })
      .catch((error) =>
        console.error("Error fetching bought properties:", error)
      );
  }, [user?.email]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Property Bought</h1>
      {boughtProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boughtProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white shadow-lg rounded-lg p-4"
            >
              <img
                src={property?.image}
                alt={property?.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-2">{property?.title}</h2>
              <p className="text-gray-700">{property?.location}</p>
              <p className="text-gray-600">Agent: {property?.agentName}</p>
              <p className="text-lg font-semibold">
                Offered: ${property?.offerAmount}
              </p>
              <p
                className={`mt-2 px-4 py-2 inline-block text-white rounded-md ${
                  property.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-green-600"
                }`}
              >
                {property.status}
              </p>

              {property.status === "accepted" && (
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Pay
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No properties bought yet.</p>
      )}
    </div>
  );
};

export default PropertyBought;
