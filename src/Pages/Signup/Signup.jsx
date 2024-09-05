import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../Providers/Authprovider";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;

            await updateUserProfile(data.name, data.photoURL);
            
            const userInfo = {
                name: data.name,
                email: data.email
            };

            const response = await axiosPublic.post('/users', userInfo);
            if (response.data.insertedId) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Muktijoddha Hall | Sign Up</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create an Account</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                placeholder="Enter your name"
                                className={`input input-bordered w-full ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                {...register("photoURL", { required: "Photo URL is required" })}
                                placeholder="Enter your photo URL"
                                className={`input input-bordered w-full ${errors.photoURL ? 'border-red-500' : ''}`}
                            />
                            {errors.photoURL && <span className="text-red-600">{errors.photoURL.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="Enter your email"
                                className={`input input-bordered w-full ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    maxLength: { value: 20, message: "Password must be less than 20 characters" },
                                    pattern: {
                                        value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                        message: "Password must include uppercase, lowercase, number, and special character"
                                    }
                                })}
                                placeholder="Enter your password"
                                className={`input input-bordered w-full ${errors.password ? 'border-red-500' : ''}`}
                            />
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full">Sign Up</button>
                        </div>
                    </form>
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignUp;
