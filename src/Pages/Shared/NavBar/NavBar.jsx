import { Link } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/Authprovider";

const NavBar = () => {

    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="meals">Meals</Link></li>
        <li><Link to="upcoming">Upcoming Meals</Link></li>
        <li><Link to="about">About</Link></li>
    </>

    return (
        <div>
            <div className="navbar bg-base-100"> 
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="text-xl font-semibold">Muktijoddha Hall</a>
                    <img className="w-8" src="https://i.ibb.co/y4TCR4p/civil-building-engineering-logo-design-template-258254241.webp" alt="" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end mr-3 gap-3">
                    {
                        user ? <>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn"><img className="w-8 h-8 rounded-full" src={user?.photoURL} alt="User" /></div>
                                <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                                    <p>{user?.displayName}</p>
                                    <li><Link to="dashboard">Dashboard</Link></li>
                                    <button onClick={handleLogOut} className="btn btn-outline m-2 btn-accent">LogOut</button>
                                </ul>
                            </div>
                        </> : <>
                            <li><Link to="login"><button className="btn btn-outline m-2 btn-accent">Join Us</button></Link></li>
                        </>
                    }
                    <button><IoMdNotifications /></button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;