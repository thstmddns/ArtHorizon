import React from "react";
import { Link } from "react-router-dom";

// import logoImage from "../assets/images/Art_Horizon_Logo.png";
import arthorizonLogo from "../assets/images/arthorizionlogo.png";

const NavBar2 = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <nav
        className="body-font container px-5 mx-auto flex py-3 flex-col md:flex-row items-center"
        // style={{ height: "70px" }}
        // style={{ height: "7vh" }}
      >
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src={arthorizonLogo} className="w-56 h-38" alt="logoImage" />
        </Link>
        <div className="text-gray-600 md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center"></div>

        <div></div>
      </nav>
      {/* <div className="h-px w-full bg-gray-200"></div> */}
    </div>
  );
};

export default NavBar2;
