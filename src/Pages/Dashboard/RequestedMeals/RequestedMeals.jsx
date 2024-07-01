import { MdCancelPresentation } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRequest from "../../../hooks/useRequest";
import { Link } from "react-router-dom";

const RequestedMeals = () => {
    const [request, refetch] = useRequest();
    const totalPrice = request.reduce((total, item) => total + item.price, 0).toFixed(2);
    const axiosSecure = useAxiosSecure();

    const handleDelete = id => {
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
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your meal has been cancelled.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    return (
        <div>
            <div className="flex justify-evenly mb-8">
                <h2 className="text-4xl">Items: {request.length}</h2>
                <h2 className="text-4xl">Total Price: ${totalPrice}</h2>
                {request.length ? (
                    <Link to="/dashboard/payment">
                        <button className="btn btn-primary">Pay</button>
                    </Link>
                ) : (
                    <button disabled className="btn btn-primary">Pay</button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {request.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt={item.title} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.title}</td>
                                <td>${item.price}</td>
                                <td>{item.status === 'delivered' ? 'delivered' : 'Pending'}</td>
                                <td>
                                    {item.status === 'delivered' ? (
                                        <button disabled className="btn btn-ghost btn-lg">
                                            <MdCancelPresentation className="bg-yellow-700" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="btn btn-ghost btn-lg"
                                        >
                                            <MdCancelPresentation className="bg-yellow-700" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedMeals;
