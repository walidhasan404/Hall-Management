import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllReviews = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllMeals = async () => {
      try {
        const response = await axios.get('https://muktijoddha-hall-server.vercel.app/meals');
        setMeals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meals:', error);
        setError('Error fetching meals');
        setLoading(false);
      }
    };

    fetchAllMeals();
  }, []);

  const handleDeleteReview = async (mealId, reviewId) => {
    try {
      await axios.delete(`https://muktijoddha-hall-server.vercel.app/meals/${mealId}/reviews/${reviewId}`);
      setMeals(meals.map(meal =>
        meal._id === mealId
          ? { ...meal, reviews: meal.reviews.filter(review => review._id !== reviewId) }
          : meal
      ));
    } catch (error) {
      console.error('Error deleting review:', error);
      setError('Error deleting review');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl text-center font-bold">All Reviews</h2>
      {meals.length === 0 ? (
        <p>No reviews found for any meal.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Meal Title</th>
              <th className="py-2">Reviews</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal._id}>
                <td className="py-2 border px-4">{meal.title}</td>
                <td className="py-2 border px-4">
                  {meal.reviews && meal.reviews.length > 0 ? (
                    <ul>
                      {meal.reviews.map((review) => (
                        <li key={review._id}>
                          {review.comment} - {review.rating}/5
                          <button
                            className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
                            onClick={() => handleDeleteReview(meal._id, review._id)}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'No reviews'
                  )}
                </td>
                <td className="py-2 border px-4">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => window.location.href = `/meal/${meal._id}`}
                  >
                    View Meal
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllReviews;
