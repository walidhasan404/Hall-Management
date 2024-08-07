# Hostel Management System Website

Welcome to the Hostel Management System (HMS) website! This platform is designed to streamline hostel operations and enhance the living experience for both administrators and residents.

**Live Site**: [Hostel Management System](https://muktijoddha-hall.web.app)
Admin Email: walid@khalid23.com & Password: Abcder23#

## Project Overview
- The HMS website aims to manage hostel operations efficiently.
- It helps in managing student details, room allocations, billing, maintenance, and communication.
- Solves problems of manual management and provides a seamless experience for users.

## Features
- **Student Management**: Register, manage, and track student details and room allocations.
- **Billing and Payments**: Generate bills, accept online payments, and track payment status.
- **Room Management**: Manage room availability, occupancy, and maintenance.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: Stripe API

## Installation Instructions
### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/hostel-management-system.git
    cd hostel-management-system
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Configure environment variables:
    - Create a `.env` file in the root directory.
    - Add the following:
        ```
        PORT=5000
        MONGO_URI=mongodb://localhost:27017/hostel
        JWT_SECRET=your_jwt_secret
        STRIPE_API_KEY=your_stripe_api_key
        ```

4. Start the backend server:
    ```sh
    npm start
    ```
5. Navigate to the frontend directory:
    ```sh
    cd frontend
    npm install
    ```
6. Start the frontend development server:
    ```sh
    npm start
    ```

Open your web browser and navigate to `http://localhost:3000` to use the application.

**Admin Credentials:**
- **Email:** walid@khalid23.com
- **Password:** Abcder23#
