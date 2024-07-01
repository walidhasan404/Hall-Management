import { FaAd, FaEnvelope, FaHome, FaUsers, FaUtensils } from "react-icons/fa";
import { GiHotMeal, GiMeal } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet } from "react-router-dom";
import { MdPayments, MdRateReview, MdReviews } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import useAdmin from "../hooks/useAdmin";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {

    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            <Helmet>
                <title>Muktijoddha Hall | Dashboard</title>
            </Helmet>
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-lime-400">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminProfile">
                                        <ImProfile></ImProfile>
                                        Admin Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users">
                                        <FaUsers></FaUsers>
                                        Manage Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addMeals">
                                        <FaUtensils></FaUtensils>
                                        Add Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allAddMeals">
                                        <GiHotMeal/>
                                        My Added Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allReviews">
                                        <MdRateReview></MdRateReview>
                                        All Reviews</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allRequest">
                                        <FaAd></FaAd>
                                        All Requests</NavLink>
                                </li>
                            </>
                            : <>
                                <li>
                                    <NavLink to="/dashboard/myProfile">
                                        <CgProfile />
                                        My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/request">
                                        <GiMeal></GiMeal>
                                        Requested Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myReviews">
                                        <MdReviews></MdReviews>
                                        My Reviews</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/history">
                                        <MdPayments></MdPayments>
                                        Payment History</NavLink>
                                </li>
                            </>
                    }
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;