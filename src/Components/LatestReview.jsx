import React from "react";

const LatestReview = () => {
  const reviews = [
    {
      id: 1,
      userName: "Rahim Uddin",
      userImage: "/images/users/rahim.jpg",
      rating: 5,
      comment:
        "Great experience! The property in Gulshan matched exactly what was shown online.",
      location: "Gulshan, Dhaka",
      date: "2025-05-20",
    },
    {
      id: 2,
      userName: "Anika Rahman",
      userImage: "/images/users/anika.jpg",
      rating: 4,
      comment:
        "Agent was helpful and responsive. Loved the Bashundhara apartment!",
      location: "Bashundhara R/A, Dhaka",
      date: "2025-05-18",
    },
    {
      id: 3,
      userName: "Sohan Karim",
      userImage: "/images/users/sohan.jpg",
      rating: 5,
      comment:
        "The verification process gave me peace of mind. Highly recommend!",
      location: "Dhanmondi, Dhaka",
      date: "2025-05-15",
    },
    {
      id: 4,
      userName: "Farzana Akter",
      userImage: "/images/users/farzana.jpg",
      rating: 3,
      comment:
        "Good service, but the location info was slightly inaccurate. Still happy overall.",
      location: "Khilgaon, Dhaka",
      date: "2025-05-10",
    },
  ];
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 my-12">
      {reviews.map((review) => (
        <div
          key={review.id}
          className=" p-4 border-2 border-accent rounded-lg shadow-md"
        >
          <div className="flex items-center gap-3 mb-2">
            <img
              src={review.userImage}
              alt={review.userName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="font-semibold">{review.userName}</h4>
              <p className="text-sm text-gray-500">{review.location}</p>
            </div>
          </div>
          <div className="text-yellow-500 mb-2">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>
          <p className="text-gray-700">{review.comment}</p>
          <p className="text-xs text-gray-400 mt-2">
            {new Date(review.date).toDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LatestReview;
