import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import AboutUs from "../../../Components/AboutUs/AboutUs";
import UpgradePackages from "../UpgradePackages/UpgradePackages";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Muktijoddha Hall | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <AboutUs></AboutUs>
            <UpgradePackages></UpgradePackages>
        </div>
    );
};

export default Home;