import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import MealsCard from "../Home/Category/MealsCard";

const UpcomingMeals = () => {

    const [meals, setMeals] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('https://muktijoddha-hall-server.vercel.app/premium')
            .then(res => {
                setMeals(res.data);
            })
            .catch(error => {
                console.error('There was an error fetching the meals!', error);
            });
    }, []);

    return (
        <div>
            <Helmet>
                <title>Muktijoddha Hall | Upcoming</title>
            </Helmet>
            <h3 className="text-2xl text-center font-bold">Upcoming Meals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-6">
                {meals.map(meal => (
                    <MealsCard key={meal._id} meal={meal} />
                ))}
            </div>
        </div>
    );
};

export default UpcomingMeals;