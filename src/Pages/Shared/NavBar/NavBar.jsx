import { Link } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/Authprovider";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const navOptions = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/meals">Meals</Link></li>
            <li><Link to="/upcoming">Upcoming Meals</Link></li>
            <li><Link to="/about">About</Link></li>
        </>
    );

    return (
        <nav className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <button tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Toggle navigation">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
                    <img className="w-8" src="https://i.ibb.co/y4TCR4p/civil-building-engineering-logo-design-template-258254241.webp" alt="Logo" />
                    <span>Muktijoddha Hall</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>

            <div className="navbar-end flex items-center space-x-3">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <button tabIndex={0} className="btn btn-ghost rounded-btn" aria-label="User menu">
                            <img className="w-8 h-8 rounded-full" src={user?.photoURL} alt={user?.displayName || "User"} />
                        </button>
                        <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <li className="p-2">{user?.displayName}</li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li>
                                <button onClick={handleLogOut} className="btn btn-outline btn-accent w-full">
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="btn btn-outline btn-accent">Join Us</button>
                    </Link>
                )}
                <button aria-label="Notifications" className="btn btn-ghost">
                    <IoMdNotifications className="text-xl" />
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
