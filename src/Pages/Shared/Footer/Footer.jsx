import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Muktijoddha Hall</h2>
                    <p>
                        Sylhet Engineering College, a prestigious institution dedicated to excellence in engineering education, provides a supportive and enriching environment for its students.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                    <p>Sylhet Engineering College</p>
                    <p>Sylhet, Bangladesh</p>
                    <p>Sylhet-3100</p>
                    <p>Email: sec.poffice@gmail.com, sec.admin@sec.ac.bd</p>
                    <p>Phone: 8802996641561</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/sec.official/" target="_blank" rel="noopener noreferrer">
                            <svg className="h-6 w-6 fill-current text-blue-600 hover:text-blue-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M22.675 0h-21.35C.599 0 0 .6 0 1.333v21.334C0 23.4.599 24 1.325 24H12.81v-9.333H9.692V10.67h3.118V8.132c0-3.1 1.896-4.787 4.662-4.787 1.325 0 2.464.098 2.797.143v3.24l-1.917.001c-1.503 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.997h-3.12V24h6.116c.727 0 1.326-.6 1.326-1.333V1.333C24 .6 23.402 0 22.675 0z"/>
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <svg className="h-6 w-6 fill-current text-blue-400 hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.936 4.936 0 0 0 2.165-2.723 9.868 9.868 0 0 1-3.127 1.195 4.92 4.92 0 0 0-8.379 4.482c-4.087-.205-7.713-2.165-10.14-5.144A4.822 4.822 0 0 0 1.64 6.575a4.922 4.922 0 0 0 2.188 4.096 4.902 4.902 0 0 1-2.228-.616c-.054 2.281 1.581 4.415 3.95 4.89a4.935 4.935 0 0 1-2.224.085 4.936 4.936 0 0 0 4.604 3.419 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067A13.945 13.945 0 0 0 7.548 21c9.057 0 14.01-7.51 14.01-14.01 0-.213 0-.425-.015-.637A10.025 10.025 0 0 0 24 4.557z"/>
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <svg className="h-6 w-6 fill-current text-pink-600 hover:text-pink-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.25 2.243 1.312 3.608.058 1.267.07 1.646.07 4.85s-.012 3.583-.07 4.849c-.062 1.366-.336 2.634-1.311 3.609-.975.975-2.242 1.249-3.608 1.311-1.267.058-1.646.07-4.85.07s-3.583-.012-4.849-.07c-1.366-.062-2.634-.336-3.609-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.583 2.163 15.204 2.163 12s.012-3.583.07-4.849c.062-1.366.336-2.634 1.311-3.609.975-.975 2.243-1.249 3.609-1.311C8.417 2.175 8.796 2.163 12 2.163M12 0C8.741 0 8.332.014 7.052.072 5.745.13 4.458.335 3.354 1.44 2.25 2.545 2.045 3.832 1.987 5.139.929 6.418.914 6.827.914 10.086v3.828c0 3.259.015 3.668.073 4.948.058 1.307.263 2.594 1.368 3.698 1.105 1.105 2.392 1.31 3.699 1.368 1.279.058 1.688.073 4.948.073s3.669-.015 4.949-.073c1.307-.058 2.594-.263 3.698-1.368 1.105-1.105 1.31-2.392 1.368-3.699.058-1.279.073-1.688.073-4.949s-.015-3.669-.073-4.949c-.058-1.307-.263-2.594-1.368-3.698-1.105-1.105-2.392-1.31-3.699-1.368-1.279-.058-1.688-.073-4.949-.073zM12 5.838a6.163 6.163 0 1 0 0 12.326A6.163 6.163 0 0 0 12 5.838zm0 10.163a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <svg className="h-6 w-6 fill-current text-blue-700 hover:text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M22.225 0H1.771C.791 0 0 .771 0 1.73v20.541C0 23.229.791 24 1.771 24h20.451c.98 0 1.777-.771 1.777-1.729V1.73C24 .771 23.205 0 22.225 0zM7.071 20.452H3.539V9h3.532v11.452zM5.304 7.439c-1.13 0-2.044-.913-2.044-2.041 0-1.127.915-2.04 2.044-2.04 1.127 0 2.041.913 2.041 2.04 0 1.128-.914 2.041-2.041 2.041zm15.117 13.013h-3.532v-5.972c0-1.42-.028-3.24-2.068-3.24-2.068 0-2.383 1.614-2.383 3.136v6.076H8.905V9h3.392v1.558h.048c.474-.899 1.634-1.847 3.367-1.847 3.604 0 4.272 2.371 4.272 5.457v6.284z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto text-center mt-6">
                <p>&copy; {new Date().getFullYear()} Muktijoddha Hall, Sylhet Engineering College. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
