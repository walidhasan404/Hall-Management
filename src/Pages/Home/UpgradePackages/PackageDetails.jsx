// PackageDetails.js

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const PackageDetails = () => {
    const { packageName } = useParams();
    const packages = {
        silver: { name: 'Silver', price: '$29.99/month', features: ['Basic Support', 'Access to all courses', 'Community Access'], image: 'https://i.ibb.co/dkfN8rq/silver.png' },
        gold: { name: 'Gold', price: '$49.99/month', features: ['Priority Support', 'Access to all courses', 'Community Access', 'Monthly Webinars'], image: 'https://i.ibb.co/K77BFr4/images-6.jpg' },
        platinum: { name: 'Platinum', price: '$79.99/month', features: ['24/7 Support', 'Access to all courses', 'Community Access', 'Monthly Webinars', 'One-on-One Mentorship'], image: 'https://i.imgur.com/i8054ZU.png' }
    };

    const pkg = packages[packageName.toLowerCase()];

    if (!pkg) {
        return (
            <div className="container mx-auto p-4">
                <SectionTitle heading="Package Not Found" />
                <p className="text-center">The package you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <Helmet>
                <title>{`${pkg.name} Package Details`}</title>
            </Helmet>
            <SectionTitle heading={`${pkg.name} Package Details`} />
            <div className="rounded overflow-hidden shadow-lg w-96 mx-auto bg-blue-50 p-6">
                <div className="text-center mb-4">
                    <img src={pkg.image} alt={`${pkg.name} package`} className="w-60 h-60 mx-auto object-cover mb-4 rounded" />
                    <h3 className="text-xl font-semibold">{pkg.name}</h3>
                    <p className="text-orange-500 font-medium">{pkg.price}</p>
                </div>
                <ul className="mb-4 text-center">
                    {pkg.features.map((feature, index) => (
                        <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                </ul>
            </div>
            <div className='text-center my-3'>
                <Link to={`/packages/${packageName}/checkout`}>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Upgrade to {pkg.name}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PackageDetails;
