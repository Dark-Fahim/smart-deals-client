// import axios from "axios";
import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
// import useAxios from "../hooks/useAxios";



const CreateProduct = () => {
    const { user } = useAuth()
    // const axiosInstance = useAxios()
    const axiosSecure = useAxiosSecure()
    const handleCreateProduct = e => {
        e.preventDefault()
        const title = e.target.title.value;
        const image = e.target.image.value;
        const price_min = e.target.price_min.value;
        const price_max = e.target.price_max.value;
        console.log(title, image, price_max, price_min);
        const newProduct = { title, image, price_min, price_max, email: user.email, name: user.displayName }
        // axios.post('https://smart-deals-server-three-alpha.vercel.app/products', newProduct)
        //     .then(data => {
        //         console.log(data.data);
        //         if (data.data.insertedId) {
        //             Swal.fire({
        //                 position: "center",
        //                 icon: "success",
        //                 title: "Your product has been created",
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             });
        //         }
        //     })

        axiosSecure.post('/products', newProduct)
            .then(data => {
                if (data.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your product has been created",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Forbidden Access Status Code 403",
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    }



    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
                {/* Back to Products */}
                <Link to="/products" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
                    ← Back To Products
                </Link>

                {/* Title */}
                <h1 className="text-3xl font-semibold text-center mb-8">
                    Create <span className="text-purple-600 font-bold">A Product</span>
                </h1>

                <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Yamaha Fz Guitar for Sale"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Category */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select className="select select-bordered w-full">
                            <option>Select a Category</option>
                            <option>Electronics</option>
                            <option>Vehicles</option>
                            <option>Furniture</option>
                            <option>Books</option>
                            <option>Others</option>
                        </select>
                    </div>

                    {/* Min & Max Price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Min Price You want to Sale ($)</span>
                        </label>
                        <input
                            name="price_min"

                            type="number" placeholder="e.g. 18.5" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Max Price You want to Sale ($)</span>
                        </label>
                        <input
                            type="number"
                            name="price_max"
                            placeholder="Optional (default = Min Price)"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Product Condition */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Condition</span>
                        </label>
                        <div className="flex items-center gap-6 mt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="condition" className="radio radio-primary" defaultChecked />
                                <span>Brand New</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="condition" className="radio radio-primary" />
                                <span>Used</span>
                            </label>
                        </div>
                    </div>

                    {/* Product Usage Time */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Usage Time</span>
                        </label>
                        <input type="text" placeholder="e.g. 1 year 3 month" className="input input-bordered w-full" />
                    </div>

                    {/* Product Image URL */}
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text">Your Product Image URL</span>
                        </label>
                        <input type="text" name="image" placeholder="https://..." className="input input-bordered w-full" />
                    </div>

                    {/* Seller Info */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Seller Name</span>
                        </label>
                        <input type="text" placeholder="e.g. Artisan Roasters" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Seller Email</span>
                        </label>
                        <input type="email" placeholder="e.g. leila13955@nrford.com" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Seller Contact</span>
                        </label>
                        <input type="text" placeholder="e.g. +1-555-1234" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Seller Image URL</span>
                        </label>
                        <input type="text" placeholder="https://..." className="input input-bordered w-full" />
                    </div>

                    {/* Location */}
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input type="text" placeholder="City, Country" className="input input-bordered w-full" />
                    </div>

                    {/* Description */}
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text">Simple Description about your Product</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows="3"
                            placeholder="e.g. I bought this product 3 months ago. Did not use more than 1/2 time..."
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 mt-6">
                        <button type="submit" className="btn btn-primary w-full text-white bg-gradient-to-r from-purple-500 to-indigo-500 border-none">
                            Create A Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
