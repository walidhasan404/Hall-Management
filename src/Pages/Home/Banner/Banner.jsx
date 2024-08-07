import React, { useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Banner = ({ title, description, buttonText, onSubmit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSubmit(searchTerm);
        setSearchTerm('');
    };

    return (
        <div className="slider-banner mx-4 lg:mx-8">
            <SectionTitle
                heading="Welcome to our dining"
            />
            <img src="https://i.ibb.co/dLZFQRZ/project1.webp" alt="HallImage" className="w-full h-48 lg:h-96 rounded-lg object-cover mb-4" />
            <p className="text-center m-4">
            Muktijoddha Hall, is a student dormitory at Sylhet Engineering College. It provides residential facilities for a large number of students, fostering a sense of community and supporting their academic pursuits.
            </p>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginRight: '10px',
                    }}
                />
                <button type="submit" style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
                    Submit
                </button>
            </form>

        </div>
    );
};

export default Banner;
