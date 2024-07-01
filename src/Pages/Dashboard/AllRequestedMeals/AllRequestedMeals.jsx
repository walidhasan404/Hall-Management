import { useState, useEffect } from "react";
import { MdCancelPresentation } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllRequestedMeals = () => {
    const [requests, setRequests] = useState([]);
    const axiosSecure = useAxiosSecure();

    const fetchRequests = async () => {
        try {
            const response = await axiosSecure.post('/requestedMeal');
            if (Array.isArray(response.data)) {
                setRequests(response.data);
            } else {
                console.error('Unexpected data format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching requested meals:', error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [axiosSecure]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/requested/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            fetchRequests();
                            Swal.fire("Deleted!", "Your meal has been cancelled.", "success");
                        }
                    });
            }
        });
    };

    const handleServe = async (id) => {
        try {
            const response = await axiosSecure.patch(`/requested/serve/${id}`);
            if (response.data.modifiedCount > 0) {
                Swal.fire("Served!", "The meal has been marked as served.", "success");
                fetchRequests();
            }
        } catch (error) {
            console.error('Error serving meal:', error);
            Swal.fire("Error", "Failed to serve meal. Please try again later.", "error");
        }
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>User Email</th>
                            <th>User Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => (
                            <tr key={request._id}>
                                <td>{index + 1}</td>
                                <td>{request.title}</td>
                                <td>{request.email}</td>
                                <td>{request.name}</td>
                                <td>{request.status}</td>
                                <td>
                                    <button
                                        onClick={() => handleServe(request._id)}
                                        className="btn btn-primary mr-2"
                                        disabled={request.status === 'delivered'}
                                    >
                                        Serve
                                    </button>
                                    <button
                                        onClick={() => handleDelete(request._id)}
                                        className="btn btn-ghost btn-lg"
                                        disabled={request.status === 'delivered'}
                                    >
                                        <MdCancelPresentation className="bg-yellow-700" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllRequestedMeals;
