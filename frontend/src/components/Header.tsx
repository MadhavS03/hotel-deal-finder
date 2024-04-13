import { Link } from "react-router-dom";
import { useState } from "react";
import { User } from "@phosphor-icons/react";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-500 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-4xl text-white font-bold tracking-tight">
          <Link to="/">LOGO</Link>
        </span>
        <span className="flex space-x-6 space-between items-center">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 py-1 font-bold hover:bg-orange-400"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 py-1 font-bold hover:bg-orange-400"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-orange-600 px-3 py-2 font-bold hover:bg-orange-500 hover:text-white mt-1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <User
                size={20}
                style={{
                  color: isHovered ? "#FFF" : "#FFA500",
                }}
              />
              <span className="ml-2">Sign In</span>
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
