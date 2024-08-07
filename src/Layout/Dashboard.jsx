import { FaAd, FaEnvelope, FaHome, FaUsers, FaUtensils } from "react-icons/fa";
import { GiHotMeal, GiMeal } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet } from "react-router-dom";
import { MdPayments, MdRateReview, MdReviews } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import useAdmin from "../hooks/useAdmin";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row">
            <Helmet>
                <title>Muktijoddha Hall | Dashboard</title>
            </Helmet>
            {/* dashboard side bar */}
            <div className={`w-full md:w-64 bg-lime-400 min-h-screen ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminProfile">
                                        <ImProfile />
                                        Admin Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users">
                                        <FaUsers />
                                        Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addMeals">
                                        <FaUtensils />
                                        Add Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allAddMeals">
                                        <GiHotMeal />
                                        My Added Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allReviews">
                                        <MdRateReview />
                                        All Reviews
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allRequest">
                                        <FaAd />
                                        All Requests
                                    </NavLink>
                                </li>
                            </>
                            : <>
                                <li>
                                    <NavLink to="/dashboard/myProfile">
                                        <CgProfile />
                                        My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/request">
                                        <GiMeal />
                                        Requested Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myReviews">
                                        <MdReviews />
                                        My Reviews
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/history">
                                        <MdPayments />
                                        Payment History
                                    </NavLink>
                                </li>
                            </>
                    }
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/contact">
                            <FaEnvelope />
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-4 md:p-8">
                <button
                    className="md:hidden p-2 bg-lime-400 rounded-full"
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
                </button>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
