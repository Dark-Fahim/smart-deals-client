import { Link } from "react-router";


const Product = ({ product }) => {
    const {title, price_min, price_max, image, _id}= product
    return (
        <div className="card bg-base-100 w-96 shadow-sm p-5">
            <figure className="px-10 pt-10">
                <img
                    src={image}
                    alt="Shoes"
                    className="rounded-xl" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title">{title}</h2>
                <p className="font-bold text-xl text-purple-600">
                    {`$${price_min} - ${price_max}`}
                </p>
                <div className="card-actions">
                    <Link to={`/product/${_id}`} className="btn w-full border-2 border-purple-600 text-purple-600">
                    View Details </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;