import ReactStars from 'react-rating-stars-component';

const MealsCard = ({ meal }) => {
    return (
        <div>
            <div className="card lg:w-96 h-full w-full bg-orange-50 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={meal.image} alt={meal.title} className="h-60 w-60 rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2><span className="text-lg font-medium">Dish Name:</span> {meal.title}</h2>
                    <h2><span className="text-lg font-medium">Category:</span> {meal.category}</h2>
                    <p><span className="text-lg font-medium">Price:</span> ${meal.price}</p>
                    <div className="flex items-center">
                        <span className="text-lg font-medium mr-2">Rating:</span>
                        <ReactStars
                            count={5}
                            value={meal.rating}
                            size={24}
                            activeColor="#ffd700"
                            edit={false}
                            isHalf={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealsCard;