import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiDish, BiLike } from "react-icons/bi";
import ReactStars from 'react-rating-stars-component';
import { motion } from 'framer-motion';
import useAuth from "../../hooks/useAuth";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import useAdmin from "../../hooks/useAdmin";

const MealDetails = ({ item }) => {
    const meal = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [newReview, setNewReview] = useState({ comment: "", rating: 0 });
    const [reviews, setReviews] = useState(meal.reviews || []);
    const [likes, setLikes] = useState(Array.isArray(meal.likes) ? meal.likes : []);
    const [isLiked, setIsLiked] = useState(user ? likes.includes(user.email) : false);
    const [isAdmin] = useAdmin();

    const fetchMealData = async () => {
        try {
            const response = await axiosSecure.get(`https://muktijoddha-hall-server.vercel.app/meals/${meal._id}`);
            setReviews(response.data.reviews || []);
            setLikes(Array.isArray(response.data.likes) ? response.data.likes : []);
            setIsLiked(user ? response.data.likes.includes(user.email) : false);
        } catch (error) {
            console.error('Error fetching meal data:', error);
        }
    };

    useEffect(() => {
        fetchMealData();
    }, [user]);

    const handleRequestedMeal = () => {
        if (user && user.email) {
            const requestedMeal = {
                mealId: meal._id,
                email: user.email,
                title: meal.title,
                image: meal.image,
                price: meal.price
            };
            axiosSecure.post('https://muktijoddha-hall-server.vercel.app/requested', requestedMeal)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${meal.title} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(error => {
                    console.error('Error requesting meal:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to request meal. Please try again later.',
                    });
                });
        } else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    const handleReviewSubmit = () => {
        if (!user) {
            Swal.fire({
                title: 'You are not Logged In',
                text: 'Please login to submit a review?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, login!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
            return;
        }

        if (newReview.comment && newReview.rating) {
            const review = {
                user: user.email,
                comment: newReview.comment,
                rating: newReview.rating
            };
            axiosSecure.post(`https://muktijoddha-hall-server.vercel.app/meals/${meal._id}/reviews`, review)
                .then(res => {
                    if (res.data) {
                        setReviews([...reviews, res.data]);
                        setNewReview({ comment: "", rating: 0 });
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Review submitted successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(error => {
                    console.error('Error submitting review:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to submit review. Please try again later.',
                    });
                });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please provide a comment and rating.',
            });
        }
    };

    const handleLike = async () => {
        if (!user) {
            Swal.fire({
                title: 'You are not Logged In',
                text: 'Please login to like the meal?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, login!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
            return;
        }

        const updatedLikes = [...likes];

        if (isLiked) {
            updatedLikes.splice(updatedLikes.indexOf(user.email), 1);
        } else {
            updatedLikes.push(user.email);
        }

        try {
            const response = await axiosSecure.put(`https://muktijoddha-hall-server.vercel.app/meals/${meal._id}/likes`, {
                likes: updatedLikes
            });

            if (response.data.acknowledged) {
                setLikes(updatedLikes);
                setIsLiked(!isLiked);

                Swal.fire({
                    position: 'top-end',
                    icon: isLiked ? 'warning' : 'success',
                    title: isLiked ? 'Unliked' : 'Liked!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                console.error('Error updating likes:', response.data.error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update like. Please try again later.'
                });
            }
        } catch (error) {
            console.error('Error updating likes:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update like. Please try again.'
            });
        }
    };

    return (
        <motion.div 
            className="mx-2 p-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.h3 
                className="my-4 text-2xl text-center font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                Meal Details
            </motion.h3>
            <motion.h3 
                className="text-center text-base font-medium my-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {meal.title}
            </motion.h3>
            <motion.img 
                className="mb-4 w-96 h-96 mx-auto"
                src={meal.image}
                alt={meal.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            />
            <motion.p 
                className="text-center mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {meal.description}
            </motion.p>
            <motion.div 
                className="p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <p className="text-base my-2 font-medium">Category : <span className="text-sm font-normal">{meal.category}</span></p>
                <p className="text-base my-2 font-medium">Price : <span className="text-sm font-normal">${meal.price}</span></p>
                <p className="text-base my-2 font-medium">Admin : <span className="text-sm font-normal">{meal.admin}</span></p>
                <p className="text-base my-2 font-medium">Post Time : <span className="text-sm font-normal">{new Date(meal.postTime).toLocaleString()}</span></p>
                <p className="text-base my-2 font-medium">Ingredients : <span className="text-sm font-normal">{meal.ingredients.join(", ")}</span></p>
                <div className="flex justify-center">
                    <div className="flex items-center">
                        <span className="text-lg font-medium mr-2">Rating: </span>
                        <ReactStars
                            count={5}
                            value={meal.rating}
                            size={24}
                            activeColor="#ffd700"
                            edit={false}
                            isHalf={true}
                        />
                    </div>
                </div>
            </motion.div>
            <motion.p 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <span className="font-medium text-lg">Likes: {likes.length}</span>
            </motion.p>
            <motion.div 
                className="flex justify-center gap-4 my-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                {!isAdmin && (
                    <>
                        <motion.button 
                            onClick={handleRequestedMeal} 
                            className="btn btn-secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <BiDish /> Request Meal
                        </motion.button>
                        <motion.button 
                            onClick={handleLike} 
                            className={`btn ${isLiked ? 'btn-danger' : 'btn-primary'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <BiLike /> {isLiked ? 'Unlike' : 'Like'}
                        </motion.button>
                    </>
                )}
            </motion.div>
            <motion.div 
                className="p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <h4 className="text-xl font-bold mb-2">Reviews</h4>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <motion.div 
                            key={index} 
                            className="border p-2 my-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <p><strong>{review.user}:</strong> {review.comment}</p>
                            <p><strong>Rating:</strong> {review.rating}</p>
                        </motion.div>
                    ))
                ) : (
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        No reviews yet.
                    </motion.p>
                )}
                {!isAdmin && (
                    <div className="mt-4">
                        <h4 className="text-lg font-bold mb-2">Add a Review</h4>
                        <textarea
                            className="border p-2 w-full"
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            placeholder="Write your review here"
                        />
                        <div className="flex items-center mt-2">
                            <span className="mr-2">
                                <ReactStars
                                    count={5}
                                    size={24}
                                    activeColor="#ffd700"
                                    value={newReview.rating}
                                    onChange={(newRating) => setNewReview({ ...newReview, rating: newRating })}
                                />
                            </span>
                            <motion.button 
                                onClick={handleReviewSubmit} 
                                className="btn btn-primary ml-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Submit Review
                            </motion.button>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default MealDetails;
