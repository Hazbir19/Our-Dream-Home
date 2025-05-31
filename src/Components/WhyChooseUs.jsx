import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="my-12 ">
      <h2 className="text-3xl font-bold text-center  font-sans mb-6">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border-2 border-accent rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold text-secondary mb-2">
            Verified Properties
          </h3>
          <p className="text-gray-600">
            All listings are reviewed and verified by our expert team to ensure
            legitimacy.
          </p>
        </div>
        <div className="p-6 border-2 border-accent rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold text-secondary mb-2">
            Trusted Agents
          </h3>
          <p className="text-gray-600">
            Work with experienced and trustworthy agents committed to helping
            you.
          </p>
        </div>
        <div className="p-6 border-2 border-accent rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold text-secondary mb-2">
            Secure Transactions
          </h3>
          <p className="text-gray-600">
            We prioritize your security with transparent and safe buying
            processes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
