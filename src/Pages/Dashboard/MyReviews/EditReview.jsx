import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const EditReview = () => {
  const { mealId, reviewId } = useParams();
  const [review, setReview] = useState({ comment: '', rating: '' });
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axiosSecure.get(`/meals/${mealId}`);
        const meal = response.data;
        const existingReview = meal.reviews.find(r => r._id === reviewId);
        if (existingReview) {
          setReview(existingReview);
        } else {
          console.error('Review not found');
        }
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };

    fetchReview();
  }, [mealId, reviewId, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axiosSecure.put(`/reviews/${mealId}/${reviewId}`, review, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      Swal.fire('Updated!', 'Your review has been updated.', 'success');
      navigate('/dashboard/myReviews');
    } catch (error) {
      console.error('Error updating review:', error);
      Swal.fire('Error!', 'There was an issue updating your review.', 'error');
    }
  };

  return (
    <div className="edit-review m-3">
      <h2 className="text-center font-bold my-3 text-2xl">Edit Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            value={review.comment}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={review.rating}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1"
            max="5"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="btn btn-primary">
            Update Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReview;
