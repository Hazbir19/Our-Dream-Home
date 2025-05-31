import React from "react";

const Advertisement = () => {
  const advertisedProperties = [
    {
      id: 1,
      image: "/images/property1.jpg",
      location: "Gulshan, Dhaka",
      priceRange: "৳1,20,00,000 - ৳1,50,00,000",
      isVerified: true,
      detailsLink: "/property/1",
    },
    {
      id: 2,
      image: "/images/property2.jpg",
      location: "Dhanmondi, Dhaka",
      priceRange: "৳90,00,000 - ৳1,10,00,000",
      isVerified: true,
      detailsLink: "/property/2",
    },
    {
      id: 3,
      image: "/images/property3.jpg",
      location: "Bashundhara R/A, Dhaka",
      priceRange: "৳85,00,000 - ৳1,20,00,000",
      isVerified: false,
      detailsLink: "/property/3",
    },
    {
      id: 4,
      image: "/images/property4.jpg",
      location: "Uttara Sector 7, Dhaka",
      priceRange: "৳70,00,000 - ৳90,00,000",
      isVerified: true,
      detailsLink: "/property/4",
    },
    {
      id: 5,
      image: "/images/property5.jpg",
      location: "Chattogram City Gate",
      priceRange: "৳65,00,000 - ৳85,00,000",
      isVerified: true,
      detailsLink: "/property/5",
    },
    {
      id: 6,
      image: "/images/property6.jpg",
      location: "Khilgaon, Dhaka",
      priceRange: "৳55,00,000 - ৳75,00,000",
      isVerified: false,
      detailsLink: "/property/6",
    },
    {
      id: 7,
      image: "/images/property7.jpg",
      location: "Rajshahi City Bypass",
      priceRange: "৳40,00,000 - ৳60,00,000",
      isVerified: true,
      detailsLink: "/property/7",
    },
    {
      id: 8,
      image: "/images/property8.jpg",
      location: "Sylhet Amberkhana",
      priceRange: "৳50,00,000 - ৳70,00,000",
      isVerified: false,
      detailsLink: "/property/8",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 ">
      {advertisedProperties.map((property) => (
        <div
          key={property.id}
          className="card shadow p-4 rounded-lg bg-custom-background"
        >
          <img
            src={property.image}
            alt="Property"
            className="rounded-md mb-3"
          />
          <h3 className="text-lg font-semibold text-secondary">
            {property.location}
          </h3>
          <p className="text-sm text-gray-600">{property.priceRange}</p>
          <p
            className={`text-sm font-medium ${
              property.isVerified ? "text-green-600" : "text-red-500"
            }`}
          >
            {property.isVerified ? "Verified" : "Not Verified"}
          </p>
          <a href="#">
            <button className="mt-2 px-4 py-1 bg-accent text-white rounded">
              Details
            </button>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Advertisement;
