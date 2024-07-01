import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Meals from "../Pages/Meals/Meals";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals";
import AboutUs from "../Components/AboutUs/AboutUs";
import MealDetails from "../Pages/MealDetails/MealDetails";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Dashboard from "../Layout/Dashboard";
import RequestedMeals from "../Pages/Dashboard/RequestedMeals/RequestedMeals";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import AdminProfile from "../Pages/Dashboard/AdminProf/AdminProfile";
import AddMeals from "../Pages/Dashboard/AddMeals/AddMeals";
import AdminRoute from "./AdminRoute";
import AllAddedMeals from "../Pages/Dashboard/AllAddedMeals/AllAddedMeals";
import ContactUs from "../Components/ContactUs/ContactUs";
import UpdateMeals from "../Pages/Dashboard/UpdateMeals/UpdateMeals";
import UpdateMeal from "../Pages/Dashboard/UpdateMeals/UpdateMeals";
import MealCard from "../Pages/Dashboard/MealCard/MealCard";
import Payment from "../Pages/Dashboard/Payment/Payment";
import AllReviews from "../Pages/Dashboard/AllReviews/AllReviews";
import AllRequestedMeals from "../Pages/Dashboard/AllRequestedMeals/AllRequestedMeals";
import MyReviews from "../Pages/Dashboard/MyReviews/MyReviews";
import EditReview from "../Pages/Dashboard/MyReviews/EditReview";
import PayHistory from "../Pages/Dashboard/Payment/PayHistory";
import PackageDetails from "../Pages/Home/UpgradePackages/PackageDetails";
import Payment2 from "../Components/Payment/Payment2";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'meals',
                element: <Meals></Meals>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <Signup></Signup>
            },
            {
                path: '/dashboard/payment',
                element: <Payment></Payment>
            },
            {
                path: 'meal/:id',
                element: <PrivateRoute><MealCard></MealCard></PrivateRoute>
            },
            {
                path: '/edit-review/:mealId/:reviewId',
                element: <PrivateRoute><EditReview></EditReview></PrivateRoute>
            },
            {
                path: 'update/:id',
                element: <AdminRoute><UpdateMeals></UpdateMeals></AdminRoute>
            },
            {
                path: '/meals/:id',
                element: <MealDetails></MealDetails>,
                loader: ({ params }) => fetch(`https://muktijoddha-hall-server.vercel.app/meals/${params.id}`)
            },
            {
                path: 'upcoming',
                element: <PrivateRoute><UpcomingMeals></UpcomingMeals></PrivateRoute>
            },
            {
                path: 'packages/:packageName',
                element: <PrivateRoute><PackageDetails></PackageDetails></PrivateRoute>
            },
            {
                path: 'packages/:packageName/checkout',
                element: <Payment2></Payment2>
            },
            {
                path: 'about',
                element: <AboutUs></AboutUs>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // User routes
            {
                path: 'request',
                element: <RequestedMeals></RequestedMeals>
            },
            {
                path: 'myReviews',
                element: <MyReviews></MyReviews>
            },
            {
                path: 'history',
                element: <PayHistory></PayHistory>
            },
            {
                path: 'myProfile',
                element: <UserProfile></UserProfile>
            },
            {
                path: 'contact',
                element: <ContactUs></ContactUs>
            },
            // Admin routes
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'addMeals',
                element: <AdminRoute><AddMeals></AddMeals></AdminRoute>
            },
            {
                path: 'allAddMeals',
                element: <AdminRoute><AllAddedMeals></AllAddedMeals></AdminRoute>
            },
            {
                path: 'allReviews',
                element: <AdminRoute><AllReviews></AllReviews></AdminRoute>
            },
            {
                path: 'allRequest',
                element: <AdminRoute><AllRequestedMeals></AllRequestedMeals></AdminRoute>
            },
            {
                path: 'adminProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
        ]
    }
]);
