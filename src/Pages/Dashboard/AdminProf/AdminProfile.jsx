import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/Authprovider";
import axios from "axios";

const AdminProfile = () => {

    const { user } = useContext(AuthContext);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get('https://muktijoddha-hall-server.vercel.app/meals');
                setMeals(response.data);
                console.log(meals);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };

        fetchMeals();
    }, []);

    return (
        <div>
            <figure className="px-10 pt-10">
                <img src={user.photoURL} alt="Shoes" className="rounded-xl w-60 h-60 mx-auto" />
            </figure>
            <div className="card-body items-center text-center">
                <p><span className='text-lg font-medium'>Name:</span> {user.displayName}</p>
                <p><span className='text-lg font-medium'>Email:</span> {user.email}</p>
                <p><span className='text-lg font-medium'>Meals Added:</span> {meals.length}</p>
            </div>
        </div>
    );
};

export default AdminProfile;