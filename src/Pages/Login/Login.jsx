import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import { AuthContext } from '../../Providers/Authprovider';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    title: 'Login Successful',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Login Failed',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            });
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        setDisabled(!validateCaptcha(user_captcha_value));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Helmet>
                <title>Muktijoddha Hall | Login</title>
            </Helmet>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
                <div className="p-6 md:p-8">
                    <h1 className="text-3xl font-semibold text-center text-gray-800">Welcome Back!</h1>
                    <p className="text-center text-gray-600 mb-6">Sign in to your account</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input
                                onBlur={handleValidateCaptcha}
                                type="text"
                                name="captcha"
                                placeholder="Enter the captcha"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className={`btn w-full ${disabled ? 'btn-disabled' : 'btn-primary'}`}
                                disabled={disabled}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <SocialLogin />
                    <p className="text-center text-gray-600 mt-4">
                        New here? <Link to="/signup" className="text-blue-600 hover:underline">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
