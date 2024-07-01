import React from 'react';

const ContactUs = () => {
    return (
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>
            <div className="mb-4">
                <h3 className="text-xl font-semibold">Muktijoddha Hall</h3>
                <p>Sylhet Engineering College</p>
                <p>Sylhet, Bangladesh</p>
            </div>
            <div className="mb-4">
                <h3 className="text-xl font-semibold">Phone</h3>
                <p>+880 1234 567890</p>
            </div>
            <div className="mb-4">
                <h3 className="text-xl font-semibold">Email</h3>
                <p>info@muktijoddhahall.com</p>
            </div>
            <div className="mb-4">
                <h3 className="text-xl font-semibold">Office Hours</h3>
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
            </div>
            <div className="mb-4">
                <h3 className="text-xl font-semibold">Location</h3>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.793669738865!2d91.82596231538426!3d24.89977998403151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374df0a4217e8f7b%3A0x8e2cb1788f3f1b9e!2sSylhet%20Engineering%20College!5e0!3m2!1sen!2sbd!4v1623315663523!5m2!1sen!2sbd" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    title="Google Maps - Sylhet Engineering College">
                </iframe>
            </div>
        </div>
    );
};

export default ContactUs;
