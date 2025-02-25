import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextMain } from "../Context/ContextApi";
import UseSecureApi from "../Custom/UseSecureApi";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { user } = useContext(ContextMain);

  const SecureApi = UseSecureApi();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  console.log(wishlist);

  useEffect(() => {
    if (!user?.email) return;

    SecureApi.get(`/properties/wishlist/${user.email}`)
      .then((res) => {
        setWishlist(res.data);
      })
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, [user?.email]);

  const handleRemove = (propertyId) => {
    SecureApi.delete(`/wishlist/${user?.id}/${propertyId}`)
      .then(() => {
        setWishlist(wishlist.filter((item) => item.propertyId !== propertyId));
        toast.success("Removed from Wishlist!");
      })
      .catch((error) => console.error("Error removing from wishlist:", error));
  };

  const handleMakeOffer = (property) => {
    navigate("/make-offer", { state: { property } });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((property) => (
          <div
            key={property.propertyId}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold mt-3">{property.title}</h2>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-gray-600">Agent: {property.agentName}</p>
            <p className="text-lg font-semibold mt-2">${property.price}</p>
            <div className="mt-4 flex justify-between">
              <Link to={`/dashboard/makeoffer/${property.propertyId}`}>
                <button
                  onClick={() => handleMakeOffer(property)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Make an Offer
                </button>
              </Link>
              <button
                onClick={() => handleRemove(property.propertyId)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
