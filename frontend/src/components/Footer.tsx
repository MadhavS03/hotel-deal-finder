const Footer = () => {
  return (
    <div
      className="bg-orange-500 py-10"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <span
          className="flex gap-2 text-3xl text-white font-bold tracking-tight"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          StayEasy{" "}
          <img
            className="mt-1"
            style={{ width: "30px", height: "30px" }}
            src="/home.png"
            alt=""
          />
        </span>
        <span
          className="text-white font-bold tracking-tight flex gap-4"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <p className="text-xl cursor-pointer">Privacy Policy</p>
          <p className="text-xl cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
