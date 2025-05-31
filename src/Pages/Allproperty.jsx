import React, { useContext, useEffect, useState } from "react";
import UseSecureApi from "../Custom/UseSecureApi";
import { Link } from "react-router-dom";
import { ContextMain } from "../Context/ContextApi";

const Allproperty = () => {
  const [properties, setProperties] = useState([]);
  const { user } = useContext(ContextMain);
  const SecureApi = UseSecureApi();

  useEffect(() => {
    SecureApi.get("/properties")
      .then((res) => {
        // Filter properties that are verified
        const verifiedProperties = res.data.filter(
          (property) => property.status === "verified"
        );
        setProperties(verifiedProperties);
      })
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Verified Properties</h1>
      {properties.length === 0 ? (
        <p className="text-gray-500">No verified properties available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-center">
                  {property.title}
                </h2>
                <div className="flex justify-between items-center mt-2 text-lg">
                  <p className="text-gray-600">{property.location}</p>

                  <p className="text-green-500 font-semibold mt-2">Verified</p>
                  <p className="text-white bg-red-400 p-[2px] font-bold mt-2">
                    ${property.price}
                  </p>
                </div>
                <div class="divider divider-warning">Agent</div>
                <div className="flex justify-evenly items-center bg-gray-100 p-2 rounded">
                  <div className="flex items-center justify-center">
                    <img
                      src={property.agentImage}
                      alt={property.agentName}
                      className="w-10 h-10 rounded-full mr-2 object-center object-cover"
                    />
                  </div>
                  <div class="divider divider-horizontal"></div>
                  <p className="text-gray-700 font-medium">
                    {property.agentName}
                  </p>
                </div>
                <div class="divider divider-warning"></div>
                {user?.role !== "admin" && user?.role !== "agent" && (
                  <>
                    <button className="mt-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                      <Link to={`/dashboard/propertyDetails/${property._id}`}>
                        View Property
                      </Link>
                      Details
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Allproperty;
