import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateMeals = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState({
        title: '',
        category: '',
        image: '',
        ingredients: '',
        description: '',
        price: 0,
        rating: 0,
        postTime: '',
        likes: 0,
        reviews: ''
    });

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const response = await axios.get(`https://muktijoddha-hall-server.vercel.app/meals/${id}`);
                const mealData = response.data;
                setMeal({
                    ...mealData,
                    ingredients: mealData.ingredients.join(', '),
                    reviews: JSON.stringify(mealData.reviews)
                });
            } catch (error) {
                console.error('Error fetching meal:', error);
            }
        };

        fetchMeal();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeal({ ...meal, [name]: value });
    };

    const handleUpdateMeal = async (e) => {
        e.preventDefault();
        const updatedMeal = {
            ...meal,
            ingredients: meal.ingredients.split(',').map(item => item.trim()),
            reviews: JSON.parse(meal.reviews)
        };

        try {
            const response = await axios.put(`https://muktijoddha-hall-server.vercel.app/meals/${id}`, updatedMeal);
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Good job!",
                    text: "Meal updated successfully",
                    icon: "success"
                });
                navigate('/dashboard/allAddMeals');
            }
        } catch (error) {
            console.error('Error updating meal:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Update Meal</h2>
            <form onSubmit={handleUpdateMeal}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="title"
                        value={meal.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="category"
                        value={meal.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="image"
                        value={meal.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="ingredients"
                        value={meal.ingredients}
                        onChange={handleChange}
                        placeholder="Ingredients (comma separated)"
                        className="input input-bordered w-full"
                    />
                    <textarea
                        name="description"
                        value={meal.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="textarea textarea-bordered w-full"
                    />
                    <input
                        type="number"
                        name="price"
                        value={meal.price}
                        onChange={handleChange}
                        placeholder="Price"
                        step="0.01"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="number"
                        name="rating"
                        value={meal.rating}
                        onChange={handleChange}
                        placeholder="Rating"
                        step="0.1"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="datetime-local"
                        name="postTime"
                        value={meal.postTime.slice(0, 16)}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="number"
                        name="likes"
                        value={meal.likes}
                        onChange={handleChange}
                        placeholder="Likes"
                        className="input input-bordered w-full"
                    />
                    <textarea
                        name="reviews"
                        value={meal.reviews}
                        onChange={handleChange}
                        placeholder="Reviews (JSON format)"
                        className="textarea textarea-bordered w-full"
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-4">
                    Update Meal
                </button>
            </form>
        </div>
    );
};

export default UpdateMeals;
