import { Helmet } from "react-helmet-async";
import { motion } from 'framer-motion';

const AboutUs = () => {
    const aboutText = [
        "Muktijoddha Hall is one of the prestigious dormitories at Sylhet Engineering College. Established to commemorate the bravery and sacrifice of the freedom fighters, this hall provides a serene and conducive environment for students to thrive both academically and personally.",
        "The hall offers a range of facilities, including comfortable accommodation, a well-equipped common room, dining services, and recreational amenities. It is designed to foster a sense of community and camaraderie among students, encouraging them to engage in various extracurricular activities and cultural events.",
        "Sylhet Engineering College, known for its excellence in engineering education, ensures that Muktijoddha Hall maintains high standards of living and learning. The hall administration is committed to providing a safe and supportive environment where students can focus on their studies and personal growth.",
        "At Muktijoddha Hall, we believe in the holistic development of our residents. Our mission is to nurture future leaders and innovators who will contribute to the progress and development of our society.",
        "We welcome all students to be a part of this vibrant community and create unforgettable memories during their time at Sylhet Engineering College."
    ];

    return (
        <div className="my-6">
            <Helmet>
                <title>Muktijoddha Hall | About Us</title>
            </Helmet>
            <motion.div 
                className="p-6 bg-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.h1 
                    className="text-4xl text-center font-extrabold mb-6 text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    About Muktijoddha Hall
                </motion.h1>
                {aboutText.map((paragraph, index) => (
                    <motion.p 
                        key={index} 
                        className="mb-4 text-lg text-gray-700 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                        {paragraph}
                    </motion.p>
                ))}
            </motion.div>
        </div>
    );
};

export default AboutUs;
