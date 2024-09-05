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
        <div className="flex flex-col md:flex-row min-h-screen">
            <Helmet>
                <title>Muktijoddha Hall | Dashboard</title>
            </Helmet>

            {/* Toggle Sidebar Button for smaller screens */}
            <div className="md:hidden p-4 flex justify-end bg-lime-400">
                <button
                    className="text-black font-medium btn"
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`bg-lime-400 p-4 absolute md:relative min-h-screen md:min-h-0 transition-transform transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 w-64 md:w-64 z-10`}
            >
                <ul className="menu p-4 space-y-4">
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminProfile" className="flex items-center">
                                    <ImProfile className="mr-1" />
                                    Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users" className="flex items-center">
                                    <FaUsers className="mr-1" />
                                    Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addMeals" className="flex items-center">
                                    <FaUtensils className="mr-1" />
                                    Add Meals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allAddMeals" className="flex items-center">
                                    <GiHotMeal className="mr-1" />
                                    My Added Meals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allReviews" className="flex items-center">
                                    <MdRateReview className="mr-1" />
                                    All Reviews
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allRequest" className="flex items-center">
                                    <FaAd className="mr-1" />
                                    All Requests
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/dashboard/myProfile" className="flex items-center">
                                    <CgProfile className="mr-1" />
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/request" className="flex items-center">
                                    <GiMeal className="mr-1" />
                                    Requested Meals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myReviews" className="flex items-center">
                                    <MdReviews className="mr-1" />
                                    My Reviews
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/history" className="flex items-center">
                                    <MdPayments className="mr-1" />
                                    Payment History
                                </NavLink>
                            </li>
                        </>
                    )}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/" className="flex items-center">
                            <FaHome className="mr-1" />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/contact" className="flex items-center">
                            <FaEnvelope className="mr-1" />
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-4 md:p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
