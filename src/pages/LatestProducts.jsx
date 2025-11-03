import { use } from "react";
import Product from "./Product";


const LatestProducts = ({ latestProductsPromise }) => {
    const latestProducts = use(latestProductsPromise)
    console.log(latestProducts);
    return (
        <div className="my-10">
            <h1 className="text-4xl text-center md:text-5xl font-bold text-gray-900 leading-snug"> Latest {" "}

                <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
                    Products
                </span>
            </h1>



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    latestProducts.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;