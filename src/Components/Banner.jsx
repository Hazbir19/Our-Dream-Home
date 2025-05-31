const Banner = ({ title, descrip }) => {
  return (
    <div className="my-12">
      <div className="max-w-screen-xl mx-auto ">
        <div>
          <h1 className="text-xl text-Text-color font-bold text-center lg:text-3xl md:text-2xl py-6">
            {title}
          </h1>
          <p className="font-normal text-sm  lg:text-xl md:text-lg ">
            {descrip}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
