import { useNavigate } from 'react-router-dom';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const UpgradePackages = () => {
    const navigate = useNavigate();
    const packages = [
        {
            name: 'Silver',
            price: '$29.99/month',
            features: ['Basic Support', 'Access to all courses', 'Community Access'],
            image: 'https://i.ibb.co/dkfN8rq/silver.png'
        },
        {
            name: 'Gold',
            price: '$49.99/month',
            features: ['Priority Support', 'Access to all courses', 'Community Access', 'Monthly Webinars'],
            image: 'https://i.ibb.co/K77BFr4/images-6.jpg' 
        },
        {
            name: 'Platinum',
            price: '$79.99/month',
            features: ['24/7 Support', 'Access to all courses', 'Community Access', 'Monthly Webinars', 'One-on-One Mentorship'],
            image: 'https://i.imgur.com/i8054ZU.png'
        }
    ];

    const handleUpgradeClick = (packageName) => {
        navigate(`/packages/${packageName.toLowerCase()}`);
    };

    return (
        <div className="container mx-auto p-4">
            <SectionTitle heading="Upgrade to Premium" />
            <div className="flex justify-around flex-col gap-3 lg:flex-row">
                {packages.map((pkg) => (
                    <div key={pkg.name} className="max-w-sm rounded overflow-hidden shadow-lg w-full bg-blue-50 p-6">
                        <div className="text-center mb-4">
                            <img src={pkg.image} alt={`${pkg.name} package`} className="w-60 h-60 mx-auto object-cover mb-4 rounded" />
                            <h3 className="text-xl font-semibold">{pkg.name}</h3>
                            <p className="text-orange-500 font-medium">{pkg.price}</p>
                        </div>
                        <div className="text-center">
                            <ul className="mb-4">
                                {pkg.features.map((feature, index) => (
                                    <li key={index} className="text-gray-600">{feature}</li>
                                ))}
                            </ul>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleUpgradeClick(pkg.name)}
                            >
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpgradePackages;