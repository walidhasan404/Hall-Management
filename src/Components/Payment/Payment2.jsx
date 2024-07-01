import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SectionTitle from '../SectionTitle/SectionTitle';
import CheckoutForm from '../../Pages/Dashboard/Payment/CheckoutForm';



const Payment2 = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

    return (
        <div>
            <SectionTitle heading="Custom Checkout" subHeading="Secure payment processing" />

            <div className="container mx-auto p-4">
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment2;
