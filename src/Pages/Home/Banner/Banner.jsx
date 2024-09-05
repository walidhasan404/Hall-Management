import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Banner = ({ title = "Welcome to Our Dining", description, buttonText = "Submit", onSubmit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSubmit(searchTerm);
        setSearchTerm('');
    };

    return (
        <motion.div 
            className="slider-banner px-4 lg:px-8 pb-4 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <SectionTitle heading={title} />
            <motion.img
                src="https://i.ibb.co/cyV1jMQ/Dining-2.jpg"
                alt="Muktijoddha Hall"
                className="w-full h-60 lg:h-96 object-cover mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />
            <motion.p
                className="text-center text-lg text-gray-700 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                {description || "Muktijoddha Hall is a student dormitory at Sylhet Engineering College. It provides residential facilities for a large number of students, fostering a sense of community and supporting their academic pursuits."}
            </motion.p>
            <motion.form 
                onSubmit={handleSearchSubmit} 
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 w-64 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <motion.button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {buttonText}
                </motion.button>
            </motion.form>
        </motion.div>
    );
};

export default Banner;
