import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/Authprovider';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../../firebase/firebase.config';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [badge, setBadge] = useState('Bronze'); // default badge

    const db = getFirestore(app);

    useEffect(() => {
        const fetchBadge = async () => {
            try {
                if (user) {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        setBadge(userDoc.data().badge);
                    }
                }
            } catch (error) {
                console.error("Error fetching user badge:", error);
            }
        };

        fetchBadge();
    }, [user]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="card w-96 mx-auto bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={user.photoURL} alt="User" className="rounded-xl w-60 h-60" />
                </figure>
                <div className="card-body items-center text-center">
                    <p><span className='text-lg font-medium'>Name:</span> {user.displayName}</p>
                    <p><span className='text-lg font-medium'>Email:</span> {user.email}</p>
                    <p><span className='text-lg font-medium'>Badge:</span> {badge}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
