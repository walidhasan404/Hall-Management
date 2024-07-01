import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaUsersRectangle } from "react-icons/fa6";
import { useState } from "react";

const AllUsers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    const handleDeleteUser = user =>{
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

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "This user has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    // Calculate pagination
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{indexOfFirstUser + index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role === 'admin' ? 'Admin' : <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-lg bg-lime-500">
                                            <FaUsersRectangle className="text-white text-2xl"></FaUsersRectangle>
                                        </button>}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {/* Pagination controls */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="btn btn-primary mx-1"
                    >
                        Previous
                    </button>
                    {[...Array(totalPages).keys()].map(page => (
                        <button
                            key={page + 1}
                            onClick={() => setCurrentPage(page + 1)}
                            className={`btn mx-1 ${currentPage === page + 1 ? 'btn-active' : 'btn-outline'}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="btn btn-primary mx-1"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
