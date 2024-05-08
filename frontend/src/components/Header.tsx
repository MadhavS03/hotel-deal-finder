import { Link } from "react-router-dom";
import { useState } from "react";
import { User } from "@phosphor-icons/react";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);

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
          >
            StayEasy{" "}
            <img
              className="mt-0.5"
              style={{
                width: "30px",
                height: "30px",
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
                className="flex items-center text-white text-lg text-stone-800 px-3 py-1 font-bold hover:bg-orange-400"
                to="/my-bookings"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white text-lg text-stone-800 px-3 py-1 font-bold hover:bg-orange-400"
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
              className="flex items-center text-orange-500 rounded bg-white px-3 py-1.5 font-bold mt-1"
              style={{
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.3s",
                color: isHovered ? "#FFF" : "#f97316",
                backgroundColor: isHovered ? "#ea580c" : "white",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <User
                size={20}
                style={{
                  color: isHovered ? "#FFF" : "#f97316",
                  transition: "color 0.3s",
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
