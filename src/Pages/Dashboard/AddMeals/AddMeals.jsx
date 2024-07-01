import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../../../Providers/Authprovider';
import Swal from 'sweetalert2';

const AddMeals = () => {
    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            setValue('admin', user.displayName);
            setValue('email', user.email);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://muktijoddha-hall-server.vercel.app/meals', data);
            if (response.data.insertedId) {
                Swal.fire({
                    title: 'Meal added successfully!',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            }
        } catch (error) {
            console.error('There was an error adding the meal:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Add Meal</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register('title', { required: true })}
                    />
                    {errors.title && <span className="text-red-600 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Category</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register('category', { required: true })}
                    />
                    {errors.category && <span className="text-red-600 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Image URL</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register('image', { required: true })}
                    />
                    {errors.image && <span className="text-red-600 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Ingredients</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register('ingredients', { required: true })}
                    />
                    {errors.ingredients && <span className="text-red-600 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register('description', { required: true })}
                    />
                    {errors.description && <span className="text-red-600 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Price</label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register('price', { required: true })}
                    />
                    {errors.price && <span className="text-red-600 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Rating</label>
                    <input
                        type="number"
                        step="0.1"
                        max="5"
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register('rating', { required: true })}
                    />
                    {errors.rating && <span className="text-red-600 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Post Time</label>
                    <input
                        type="datetime-local"
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register('postTime', { required: true })}
                    />
                    {errors.postTime && <span className="text-red-600 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Likes</label>
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register('likes')}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Reviews</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register('reviews')}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Admin Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register('admin', { required: true })}
                        defaultValue={user?.name || ''}
                        readOnly
                    />
                    {errors.admin && <span className="text-red-600 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        {...register('email', { required: true })}
                        defaultValue={user?.email || ''}
                        readOnly
                    />
                    {errors.email && <span className="text-red-600 text-sm">This field is required</span>}
                </div>

                <button type="submit" className="btn btn-primary w-full py-2">Add Meal</button>
            </form>
        </div>
    );
};

export default AddMeals;
