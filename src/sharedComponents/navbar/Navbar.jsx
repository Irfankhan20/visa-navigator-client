import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../components/provider/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Apply the theme to the document body
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const [visible, setVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const profileRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside the profile dropdown
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setVisible(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileToggle = () => {
    if (window.innerWidth <= 1024) {
      setVisible(!visible);
    }
  };
  const handleMenuToggle = () => {
    setMenuVisible((prev) => !prev);
  };
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const navlink = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline font-bold text-white" : "hover:font-bold"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline font-bold text-white" : "hover:font-bold"
          }
          to={"/allvisa"}
        >
          All Visas
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline font-bold text-white" : "hover:font-bold"
          }
          to={"/addvisa"}
        >
          Add Visa
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline font-bold text-white" : "hover:font-bold"
          }
          to={"/addedvisa"}
        >
          My Added Visas
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "underline font-bold text-white" : "hover:font-bold"
          }
          to={"/visaapplication"}
        >
          My Visa Applications
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar fixed z-50 w-full bg-primary text-text">
        <div className="navbar-start">
          <Link
            to={""}
            className="mx-4 font-bold font-serif text-text text-2xl"
          >
            VisaNavigator
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-lg">{navlink}</ul>
        </div>
        <div className="navbar-end">
          <button
            onClick={toggleTheme}
            className="btn btn-outline rounded-full border-white mx-2"
            title="Toggle Theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          {/* for large devices */}
          {user ? (
            <div
              className="flex items-center relative lg:hover:block lg:hover-visible"
              onMouseEnter={() => window.innerWidth > 1024 && setVisible(true)} // Show on hover for large screens
              onMouseLeave={() => window.innerWidth > 1024 && setVisible(false)} // Hide on hover for large screens
              onClick={handleProfileToggle} // Toggle visibility on click for medium/small screens
              ref={profileRef} // Attach ref to the profile container
            >
              <div className="flex items-center md:gap-5 border rounded-full w-10 h-10 border-white cursor-pointer">
                <img
                  className="rounded-full ml-[3px] w-8 h-8 mr-3"
                  src={user.photoURL}
                  alt={user.email}
                />
              </div>
              {visible && (
                <div className="bg-white shadow-2xl rounded-xl absolute top-9 right-2 md:w-48 w-36 p-4">
                  <h1 className="text-center text-black text-base hidden md:block font-semibold">
                    Welcome {user.displayName} !!!
                  </h1>
                  <Link>
                    <button className="btn w-full mt-2 btn-outline btn-success">
                      Profile
                    </button>
                  </Link>
                  <button
                    onClick={signOutUser}
                    className="justify-center py-2 rounded-xl w-full border-none lg:flex text-text bg-button font-bold mt-3"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <NavLink
                to={"/signin"}
                className={({ isActive }) =>
                  isActive
                    ? "btn hidden border-none lg:flex text-button bg-text font-bold"
                    : "btn hidden lg:flex text-white border border-white bg-button font-bold"
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to={"/signup"}
                className={({ isActive }) =>
                  isActive
                    ? "btn hidden border-none lg:flex text-button bg-text font-bold"
                    : "btn hidden lg:flex text-white border border-white bg-button font-bold"
                }
              >
                Sign Up
              </NavLink>
            </div>
          )}
          {/* for small devices */}
          <div className="dropdown z-50" ref={menuRef}>
            <div
              onClick={handleMenuToggle}
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {menuVisible && (
              <ul
                tabIndex={0}
                className="menu text-lg menu-sm dropdown-content right-0 mt-3 z-[1] p-2 shadow bg-[#3b3b3aea] text-white rounded-box w-52"
              >
                {navlink}
                <li className="justify-center font-bold">
                  {user ? (
                    ""
                  ) : (
                    <div className="">
                      <Link
                        to={"/signin"}
                        className="btn border-none lg:flex bg-button py-3 mt-3 font-bold text-text"
                      >
                        Sign In
                      </Link>
                      <Link
                        to={"/signup"}
                        className="btn border-none lg:flex bg-button py-3 mt-3 font-bold text-text"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
