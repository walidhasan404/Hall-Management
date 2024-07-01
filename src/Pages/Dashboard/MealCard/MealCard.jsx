import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';

const MealCard = () => {
    const [meal, setMeal] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const response = await axiosSecure.get(`/meals/${id}`);
                setMeal(response.data);
            } catch (error) {
                console.error('Error fetching meal:', error);
            }
        };

        if (id) {
            fetchMeal();
        }
    }, [id, axiosSecure]);

    if (!meal) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl mx-auto">
                <figure className="px-10 pt-10">
                    <img src={meal.image} alt={meal.title} className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{meal.title}</h2>
                    <p>{meal.description}</p>
                </div>
            </div>
        </div>
    );
};

export default MealCard;
