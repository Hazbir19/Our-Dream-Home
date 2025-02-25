import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import { ContextMain } from "../Context/ContextApi";
import UseSecureApi from "../Custom/UseSecureApi";
import { toast } from "react-toastify";

const MakeOffer = () => {
  const { user } = useContext(ContextMain);
  const SecureApi = UseSecureApi();
  const navigate = useNavigate();
  const { propertyId } = useParams();

  const [property, setProperty] = useState([]);
  const [offerAmount, setOfferAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState("");

  useEffect(() => {
    SecureApi.get(`/properties/makeOffer/${propertyId}`)
      .then((res) => {
        setProperty(res.data);
      })
      .catch((error) => console.error("Error fetching property:", error));
  }, [propertyId]);

  const { title, location, agentName, agentEmail, minPrice, maxPrice } =
    property;

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    const offer = parseFloat(offerAmount);

    if (isNaN(offer) || offer < minPrice || offer > maxPrice) {
      toast.error(`Offer must be between $${minPrice} and $${maxPrice}`);
      return;
    }

    const offerData = {
      propertyId,
      buyerEmail: user?.email,
      buyerName: user?.name,
      agentName,
      agentEmail,
      location,
      title,
      offerAmount: offer,
      buyingDate,
      status: "pending",
    };

    SecureApi.post("/property/Priceoffer", offerData)
      .then(() => {
        toast.success("Offer submitted successfully!");
        navigate("/dashboard/propertyBrougth");
      })
      .catch((error) => {
        console.error("Error submitting offer:", error);
        toast.error("Failed to submit offer");
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Make an Offer</h1>
      <form onSubmit={handleOfferSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Property Title</label>
          <input type="text" value={title} readOnly className="input-field" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            value={property?.location}
            readOnly
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Agent Name</label>
          <input
            type="text"
            value={agentName}
            readOnly
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Agent Name</label>
          <input
            type="text"
            value={agentEmail}
            readOnly
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Buyer Name</label>
          <input
            type="text"
            value={user?.name}
            readOnly
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Buyer Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Offer Amount ($)</label>
          <input
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            className="input-field"
            required
          />
          <p className="text-sm text-gray-500">
            Allowed range: ${minPrice} - ${maxPrice}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Buying Date</label>
          <input
            type="date"
            value={buyingDate}
            onChange={(e) => setBuyingDate(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
