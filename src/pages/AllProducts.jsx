import { useEffect, useState } from "react";
import Product from "./Product";


const AllProducts = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        })
    }, [])


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    products.map(product => <Product key={product._id} product={product}/>)
                }
            </div>
        </>
    );
};

export default AllProducts;