import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "@phosphor-icons/react";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  return (
    <div className="bg-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <span
          className="text-3xl text-white font-bold tracking-tight"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <Link
            className="flex gap-2 items-center"
            to="/"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            StayEasy{" "}
            <img
              className="mt-0.5"
              style={{
                width: "30px",
                height: "30px",
                transition: "transform 0.3s", // Added transition for rotation
                transform: isHovered ? "rotate(180deg)" : "rotate(0deg)", // Rotate image on hover
              }}
              src="/home.png"
              alt=""
            />
          </Link>
        </span>
        <span className="flex space-x-6 space-between items-center">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-lg text-stone-800 px-3 py-1 font-bold hover:bg-orange-400"
                to="/my-bookings"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-lg text-stone-800 px-3 py-1 font-bold hover:bg-orange-400"
                to="/my-hotels"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-orange-500 bg-white px-3 py-2.5 pb-2.5 font-bold hover:bg-orange-600 hover:text-white mt-1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                borderRadius: "0.3rem",
                transition: "all 0.3s",
              }}
            >
              <User
                className="mt-1"
                size={20}
                style={{
                  color: isHovered ? "#FFF" : "#f97316",
                }}
              />
              <span className="ml-2 text-lg">Sign In</span>
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
