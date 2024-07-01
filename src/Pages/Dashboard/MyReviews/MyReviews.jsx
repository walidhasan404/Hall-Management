import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosSecure.get(`/reviews/${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (user) {
      fetchReviews();
    }
  }, [user]);

  const handleDelete = async (mealId, reviewId) => {
    try {
      const token = localStorage.getItem('token');
      await axiosSecure.delete(`/reviews/${mealId}/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReviews(reviews.filter(review => review._id !== reviewId));
      Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting review:', error);
      Swal.fire('Error!', 'There was an issue deleting your review.', 'error');
    }
  };

  const handleEdit = (mealId, reviewId) => {
    navigate(`/edit-review/${mealId}/${reviewId}`);
  };

  const handleViewMeal = (mealId) => {
    navigate(`/meal/${mealId}`);
  };

  return (
    <div>
      <h2 className='text-center font-bold my-3 text-2xl'>My Reviews</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className=''>
            <th className="px-4 font-normal py-2">Meal Title</th>
            <th className="px-4 font-normal py-2">Rating</th>
            <th className="px-4 font-normal py-2">Review</th>
            <th className="px-4 font-normal py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review._id}>
              <td className="border px-4 py-2">{review.mealTitle}</td>
              <td className="border px-4 py-2">{review.rating}</td>
              <td className="border px-4 py-2">{review.comment}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(review.mealId, review._id)} className="btn btn-sm btn-warning mr-2">Edit</button>
                <button onClick={() => handleDelete(review.mealId, review._id)} className="btn btn-sm btn-danger mr-2">Delete</button>
                <button onClick={() => handleViewMeal(review.mealId)} className="btn btn-sm btn-info">View Meal</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReviews;
