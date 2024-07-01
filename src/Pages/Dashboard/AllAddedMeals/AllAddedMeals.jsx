import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllAddedMeals = () => {
    const [meals, setMeals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get('https://muktijoddha-hall-server.vercel.app/meals');
                setMeals(response.data);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };

        fetchMeals();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://muktijoddha-hall-server.vercel.app/meals/${id}`);
            if (response.status === 200) {
                setMeals(meals.filter(meal => meal._id !== id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your meal has been cancelled.",
                    icon: "success"
                });
            } else {
                throw new Error('Failed to delete the meal');
            }
        } catch (error) {
            console.error('Error deleting meal:', error);
            Swal.fire({
                title: "Error!",
                text: "There was an issue deleting the meal.",
                icon: "error"
            });
        }
    };

    // Calculate pagination
    const indexOfLastMeal = currentPage * itemsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
    const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);
    const totalPages = Math.ceil(meals.length / itemsPerPage);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">All Added Meals</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">Likes</th>
                        <th className="py-2 px-4 border-b">Reviews</th>
                        <th className="py-2 px-4 border-b">Distributor Name</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMeals.map((meal) => (
                        <tr key={meal._id}>
                            <td className="py-2 px-4 border-b">{meal.title}</td>
                            <td className="py-2 px-4 border-b">{meal.likes}</td>
                            <td className="py-2 px-4 border-b">
                                <ul>
                                    {Array.isArray(meal.reviews) ? meal.reviews.map((review, index) => (
                                        <li key={index}>
                                            <strong>{review.user}</strong>: {review.comment} (Rating: {review.rating})
                                        </li>
                                    )) : <li>No reviews</li>}
                                </ul>
                            </td>
                            <td className="py-2 px-4 border-b">{meal.admin}</td>
                            <td className="py-2 px-4 border-b">
                                <Link to={`/meal/${meal._id}`}><button className="btn bg-green-400 text-white">View</button></Link>
                                <Link to={`/update/${meal._id}`}><button className="btn bg-green-400 text-white">Update</button></Link>
                                <button onClick={() => handleDelete(meal._id)} className="btn bg-orange-400 text-white btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination controls */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn btn-primary mx-1"
                >
                    Previous
                </button>
                {[...Array(totalPages).keys()].map(page => (
                    <button
                        key={page + 1}
                        onClick={() => setCurrentPage(page + 1)}
                        className={`btn mx-1 ${currentPage === page + 1 ? 'btn-active' : 'btn-outline'}`}
                    >
                        {page + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="btn btn-primary mx-1"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllAddedMeals;
