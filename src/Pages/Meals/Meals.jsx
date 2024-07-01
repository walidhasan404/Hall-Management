import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MealsCard from '../Home/Category/MealsCard';
import { Helmet } from 'react-helmet-async';

const Meals = () => {
    const [meals, setMeals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState({ min: 4, max: 16 });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        axios.get('https://muktijoddha-hall-server.vercel.app/meals')
            .then(res => {
                setMeals(res.data);
            })
            .catch(error => {
                console.error('There was an error fetching the meals!', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1); // Reset to first page on category change
    };

    const handlePriceRangeChange = (event) => {
        const { name, value } = event.target;
        setPriceRange(prevState => ({
            ...prevState,
            [name]: value
        }));
        setCurrentPage(1); // Reset to first page on price range change
    };

    const filteredMeals = meals.filter(meal => {
        const matchesSearchQuery = meal.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory.toLowerCase() === 'all' || meal.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesPriceRange = meal.price >= priceRange.min && meal.price <= priceRange.max;

        return matchesSearchQuery && matchesCategory && matchesPriceRange;
    });

    const indexOfLastMeal = currentPage * itemsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
    const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);
    const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

    return (
        <div className="m-6">
            <Helmet>
                <title>Muktijoddha Hall | Meals</title>
            </Helmet>
            <h3 className="text-3xl text-center mb-4 font-bold">Our Meals</h3>
            <div className="mb-4 text-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for meals..."
                    className="input input-bordered w-full max-w-xs mb-2"
                />
                <div>
                    <label className="mr-2">Category:</label>
                    <select value={selectedCategory} onChange={handleCategoryChange} className="select select-bordered mb-2">
                        <option value="All">All</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                </div>
                <div className="flex justify-center items-center mb-2">
                    <label className="mr-2">Price Range:</label>
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentMeals.map(meal => (
                    <MealsCard key={meal._id} meal={meal} />
                ))}
            </div>
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

export default Meals;
