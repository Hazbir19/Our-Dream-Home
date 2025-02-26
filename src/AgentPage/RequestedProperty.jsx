import React, { useEffect, useState, useContext } from "react";
import { ContextMain } from "../Context/ContextApi";
import UseSecureApi from "../Custom/UseSecureApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const RequestedProperty = () => {
  const { user } = useContext(ContextMain);
  const SecureApi = UseSecureApi();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    SecureApi.get(`/property/Request/${user?.email}`)
      .then((res) => {
        console.log(res.data);
        setRequests(res.data);
      })
      .catch((error) => console.error("Error fetching requests:", error));
  }, [user?.email]);

  const handleAccept = (offerId) => {
    SecureApi.put(`/property/accept/${offerId}`)
      .then(() => {
        setRequests((prevRequests) =>
          prevRequests.map((offer) =>
            offer._id === offerId
              ? { ...offer, status: "accepted" }
              : offer.propertyId ===
                prevRequests.find((o) => o._id === offerId)?.propertyId
              ? { ...offer, status: "rejected" }
              : offer
          )
        );
        toast.success("Offer accepted. Other offers rejected.");
      })
      .catch((error) => console.error("Error accepting offer:", error));
  };

  const handleReject = (offerId) => {
    SecureApi.put(`/property/reject/${offerId}`)
      .then(() => {
        setRequests((prevRequests) =>
          prevRequests.map((offer) =>
            offer._id === offerId ? { ...offer, status: "rejected" } : offer
          )
        );
        toast.info("Offer rejected.");
      })
      .catch((error) => console.error("Error rejecting offer:", error));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Requested Properties
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto bg-white shadow-lg rounded-lg"
      >
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">Property Title</th>
              <th className="p-3">Location</th>
              <th className="p-3">Buyer Name</th>
              <th className="p-3">Buyer Email</th>
              <th className="p-3">Offered Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((offer) => (
              <motion.tr
                key={offer._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="border-b text-center hover:bg-gray-100"
              >
                <td className="p-3">{offer.title}</td>
                <td className="p-3">{offer.location}</td>
                <td className="p-3">{offer.buyerName}</td>
                <td className="p-3">{offer.buyerEmail}</td>
                <td className="p-3">${offer.offerAmount}</td>
                <td
                  className={`p-3 font-semibold ${
                    offer.status === "accepted"
                      ? "text-green-600"
                      : offer.status === "rejected"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {offer.status}
                </td>
                <td className="p-3">
                  {offer.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(offer._id)}
                        className="btn btn-success btn-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(offer._id)}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default RequestedProperty;
