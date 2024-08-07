import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MealsCard from './MealsCard';

const Category = () => {
    const [meals, setMeals] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        axios.get('https://muktijoddha-hall-server.vercel.app/meals')
            .then(res => {
                setMeals(res.data);
            })
            .catch(error => {
                console.error('There was an error fetching the meals!', error);
            });
    }, []);

    const renderMeals = () => {
        return meals
            .filter(meal => selectedCategory === 'all' || meal.category === selectedCategory)
            .map(meal => (
                <MealsCard key={meal._id} meal={meal} />
            ));
    };

    return (
        <div className="lg:m-6 m-4">
            <div className="tabs tabs-boxed bg-blue-50 mb-4">
                <button
                    className={`tab ${selectedCategory === 'all' ? 'tab-active' : ''}`}
                    onClick={() => setSelectedCategory('all')}
                >
                    All Meals
                </button>
                <button
                    className={`tab ${selectedCategory === 'breakfast' ? 'tab-active' : ''}`}
                    onClick={() => setSelectedCategory('breakfast')}
                >
                    Breakfast
                </button>
                <button
                    className={`tab ${selectedCategory === 'lunch' ? 'tab-active' : ''}`}
                    onClick={() => setSelectedCategory('lunch')}
                >
                    Lunch
                </button>
                <button
                    className={`tab ${selectedCategory === 'dinner' ? 'tab-active' : ''}`}
                    onClick={() => setSelectedCategory('dinner')}
                >
                    Dinner
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderMeals()}
            </div>
        </div>
    );
};

export default Category;
