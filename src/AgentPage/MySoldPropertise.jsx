import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ContextMain } from "../Context/ContextApi";
import UseSecureApi from "../Custom/UseSecureApi";

const MySoldProperties = () => {
  const [soldProperties, setSoldProperties] = useState([]);
  const secureApi = UseSecureApi();
  const { user } = useContext(ContextMain);

  useEffect(() => {
    const fetchSoldProperties = async () => {
      try {
        const response = await secureApi.get(`/payment/${user?.email}`); // Update endpoint accordingly
        setSoldProperties(response.data);
      } catch (error) {
        console.error("Error fetching sold properties:", error);
      }
    };

    fetchSoldProperties();
  }, [secureApi]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-base-100 shadow-xl rounded-xl"
    >
      <h1 className="text-3xl font-bold text-center mb-6">
        My Sold Properties
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full border rounded-lg">
          <thead>
            <tr className="bg-primary text-white text-lg">
              <th>Property Title</th>
              <th>Location</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Sold Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {soldProperties.length > 0 ? (
              soldProperties.map((property) => (
                <tr key={property._id} className="hover">
                  <td>{property?.Title}</td>
                  <td>{property?.location}</td>
                  <td>{property?.name}</td>
                  <td>{property?.email}</td>
                  <td>${property?.Amount}</td>
                  <td className="text-green-500 font-bold">
                    {property?.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No properties sold yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MySoldProperties;
