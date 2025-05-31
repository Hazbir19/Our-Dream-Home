import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ContextMain } from "../Context/ContextApi";
import UseSecureApi from "../Custom/UseSecureApi";
import { toast } from "react-toastify";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(ContextMain);
  const SecureApi = UseSecureApi();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    SecureApi.get(`/properties/propertyDetails/${id}`)
      .then((res) => {
        setProperty(res.data);
      })
      .catch((error) =>
        console.error("Error fetching property details:", error)
      );

    SecureApi.get(`/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [id]);

  const handleWishlist = () => {
    const wishlistItem = {
      userId: user?.id,
      userEmail: user?.email,
      propertyId: id,
      title: property?.title,
      location: property?.location,
      image: property?.image,
      price: property?.price,
      agentName: property?.agentName,
      agentEmail: property?.agentEmail,
      verificationStatus: property?.verificationStatus,
    };

    SecureApi.post("/properties/wishlist", wishlistItem)
      .then(() => toast.success("Added to Wishlist!"))
      .catch((error) => console.error("Error adding to wishlist:", error));
  };

  const handleAddReview = () => {
    if (!newReview.trim()) {
      toast.error("Review cannot be empty");
      return;
    }

    const reviewData = {
      userId: user?.id,
      review: newReview,
    };

    SecureApi.post(`/reviews/${id}`, reviewData)
      .then(() => {
        toast.success("Review added successfully!");
        setReviews([...reviews, { user: user?.name, review: newReview }]);
        setShowReviewModal(false);
        setNewReview("");
      })
      .catch((error) => console.error("Error adding review:", error));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <>
        <div>
          <img
            src={property?.image}
            alt={property?.title}
            className="w-1/2 rounded-lg"
          />
          <h1 className="text-3xl font-bold mt-4">{property?.title}</h1>
          <p className="text-gray-700">{property?.description}</p>
          <p className="text-xl font-semibold mt-2">${property?.price}</p>
          <p className="text-gray-600">Agent: {property?.agentName}</p>
          {user?.role !== "admin" && user?.role !== "agent" && (
            <>
              <button
                onClick={handleWishlist}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add to Wishlist
              </button>
            </>
          )}
        </div>
      </>
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((rev, index) => (
            <p key={index} className="bg-gray-100 p-2 rounded mt-2">
              <strong>{rev.user}:</strong> {rev.review}
            </p>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
        {user?.role !== "admin" && user?.role !== "agent" && (
          <>
            <button
              onClick={() => setShowReviewModal(true)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add a Review
            </button>
          </>
        )}
      </div>
      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold">Add a Review</h2>
            <textarea
              className="w-full p-2 border rounded mt-2"
              rows="4"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowReviewModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReview}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
