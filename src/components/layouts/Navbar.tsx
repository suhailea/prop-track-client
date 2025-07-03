import reactLogo from "@/assets/react.svg";
import { Building, Home, Key } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ role }: { role: "admin" | "agent" | "client" }) => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center">
            <img src={reactLogo} alt="Logo" className="h-8 w-auto" />
            <span className="ml-2 text-xl font-bold">Product</span>
          </div>
          {/* Right: Nav options */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center text-gray-700 text-sm hover:text-black"
            >
              <Home className="w-4 h-4 mr-1.5" /> Buy
            </Link>
            {(role === "admin" || role === "agent") && (
              <Link
                to="/sell"
                className="flex items-center text-gray-700 text-sm hover:text-black"
              >
                <Building className="w-4 h-4 mr-1.5" /> Sell
              </Link>
            )}

            <Link
              to="/rent"
              className="flex items-center text-gray-700 text-sm hover:text-black"
            >
              <Key className="w-4 h-4 mr-1.5" /> Rent
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
