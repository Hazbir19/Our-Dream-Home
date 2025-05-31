import React from "react";
import WhyChooseUs from "../Components/WhyChooseUs";
import Advertisement from "../Components/Advertisement";
import Banner from "../Components/Banner";
import LatestReview from "../Components/LatestReview";

const HomePage = () => {
  return (
    <>
      <div className="bg-primary relative">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between py-24">
          <div className="md:w-1/2 mx-5">
            <h1 className="lg:text-7xl md:text-4xl text-3xl font-bold">
              Find Your Dream Property Today
            </h1>
            <p className="text-lg mt-2">
              Verified listings. Trusted agents. Secure deals.
            </p>
            <input
              type="text"
              placeholder="Search by location..."
              className="mt-4 p-2 rounded w-full md:w-3/4"
            />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-end">
            <img
              src="https://i.ibb.co/4wJXwLXB/House-searching-cuate.png"
              alt="Dream Property"
              className="w-full max-w-sm "
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 overflow-hidden leading-none z-10">
          <svg
            className="w-full h-[100px] md:h-[120px] lg:h-[140px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
        {/* Why Choose Us */}
      </div>
      <div className="lg:max-w-screen-xl lg:mx-auto px-5">
        <WhyChooseUs></WhyChooseUs>
      </div>
      <div className="lg:max-w-screen-xl lg:mx-auto px-5 my-12">
        <Banner title={"Advertisement"}></Banner>
        <Advertisement></Advertisement>
        <Banner title={"Latest Reviews"}></Banner>
        <LatestReview></LatestReview>
      </div>
    </>
  );
};

export default HomePage;
