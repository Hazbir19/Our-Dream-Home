import React from "react";

const Titile_Comp = ({ title, descript }) => {
  return (
    <div>
      <div className="lg:p-4 border border-t-gray-100 border-b-gray-100 ">
        <h1 className="text-white text-2xl font-bold text-center">{title}</h1>
        <p className="text-white">{descript}</p>
      </div>
    </div>
  );
};

export default Titile_Comp;
