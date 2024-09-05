import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MealsCard from '../Home/Category/MealsCard';
import { Helmet } from 'react-helmet-async';

const Meals = () => {
    const [meals, setMeals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState({ min: 4, max: 16 });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        axios.get('https://muktijoddha-hall-server.vercel.app/meals')
            .then(res => setMeals(res.data))
            .catch(error => console.error('Error fetching meals:', error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
    };

    const handlePriceRangeChange = (event) => {
        const { name, value } = event.target;
        setPriceRange(prevState => ({
            ...prevState,
            [name]: value
        }));
        setCurrentPage(1);
    };

    const filteredMeals = meals.filter(meal => {
        const matchesSearchQuery = meal.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || meal.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesPriceRange = meal.price >= priceRange.min && meal.price <= priceRange.max;
        return matchesSearchQuery && matchesCategory && matchesPriceRange;
    });

    const indexOfLastMeal = currentPage * itemsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
    const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);
    const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

    return (
        <div className="px-6 py-10">
            <Helmet>
                <title>Muktijoddha Hall | Meals</title>
            </Helmet>
            <motion.h3 
                className="text-4xl text-center mb-8 font-extrabold text-gray-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Our Meals
            </motion.h3>
            <motion.div 
                className="flex flex-col lg:flex-row justify-between items-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex flex-col lg:flex-row items-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search for meals..."
                        className="input input-bordered w-full max-w-xs lg:mr-4 mb-4 lg:mb-0"
                    />
                    <div className="flex items-center mb-4 lg:mb-0">
                        <label className="mr-2 font-medium text-gray-700">Category:</label>
                        <select 
                            value={selectedCategory} 
                            onChange={handleCategoryChange} 
                            className="select select-bordered">
                            <option value="All">All</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center">
                    <label className="mr-2 font-medium text-gray-700">Price Range:</label>
                    <input
                        type="number"
                        name="min"
                        value={priceRange.min}
                        onChange={handlePriceRangeChange}
                        placeholder="Min"
                        className="input input-bordered w-20 mr-2"
                    />
                    <input
                        type="number"
                        name="max"
                        value={priceRange.max}
                        onChange={handlePriceRangeChange}
                        placeholder="Max"
                        className="input input-bordered w-20"
                    />
                </div>
            </motion.div>
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } }
                }}
            >
                {currentMeals.map(meal => (
                    <motion.div
                        key={meal._id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MealsCard meal={meal} />
                    </motion.div>
                ))}
            </motion.div>
            <motion.div 
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`btn mx-1 ${currentPage === 1 ? 'btn-disabled' : 'btn-primary'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Previous
                </button>
                {[...Array(totalPages).keys()].map(page => (
                    <motion.button
                        key={page + 1}
                        onClick={() => setCurrentPage(page + 1)}
                        className={`btn mx-1 ${currentPage === page + 1 ? 'btn-active' : 'btn-outline'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {page + 1}
                    </motion.button>
                ))}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`btn mx-1 ${currentPage === totalPages ? 'btn-disabled' : 'btn-primary'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Next
                </button>
            </motion.div>
        </div>
    );
};

export default Meals;
