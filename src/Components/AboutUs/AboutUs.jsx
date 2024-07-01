import { Helmet } from "react-helmet-async";

const AboutUs = () => {
    return (
        <div className="m-6">
            <Helmet>
                <title>Muktijoddha Hall | Home</title>
            </Helmet>
            <div className="bg-yellow-50 shadow-xl p-6 rounded-lg">
                <h1 className="text-3xl text-center font-bold mb-4">About Muktijoddha Hall</h1>
                <p className="mb-4">
                    Muktijoddha Hall is one of the prestigious dormitories at Sylhet Engineering College. Established to commemorate the bravery and sacrifice of the freedom fighters, this hall provides a serene and conducive environment for students to thrive both academically and personally.
                </p>
                <p className="mb-4">
                    The hall offers a range of facilities, including comfortable accommodation, a well-equipped common room, dining services, and recreational amenities. It is designed to foster a sense of community and camaraderie among students, encouraging them to engage in various extracurricular activities and cultural events.
                </p>
                <p className="mb-4">
                    Sylhet Engineering College, known for its excellence in engineering education, ensures that Muktijoddha Hall maintains high standards of living and learning. The hall administration is committed to providing a safe and supportive environment where students can focus on their studies and personal growth.
                </p>
                <p className="mb-4">
                    At Muktijoddha Hall, we believe in the holistic development of our residents. Our mission is to nurture future leaders and innovators who will contribute to the progress and development of our society.
                </p>
                <p className="mb-4">
                    We welcome all students to be a part of this vibrant community and create unforgettable memories during their time at Sylhet Engineering College.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;