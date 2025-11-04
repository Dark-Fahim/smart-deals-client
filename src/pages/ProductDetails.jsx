import React, { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import AuthContext from "../context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
    const product = useLoaderData()
    const { user } = useContext(AuthContext)
    const [bids, setBids] = useState([])
    const bidModalRef = useRef(null)

    const { title, email, price_max, price_min, category, created_at, status, location, seller_name, condition, usage, description, seller_contact, _id } = product

    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${_id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBids(data)
            })
    }, [_id])

    // const bids = [
    //     { id: 1, product: "Orange Juice", buyer: "Sara Chen", price: "$10" },
    //     { id: 2, product: "Orange Juice", buyer: "Sara Chen", price: "$12" },
    //     { id: 3, product: "Orange Juice", buyer: "Sara Chen", price: "$10" },
    // ];
    const handleModalRef = () => {
        bidModalRef.current.showModal()
    }

    const handleBidSubmit = e => {
        e.preventDefault()
        const email = e.target.email.value
        const name = e.target.name.value
        const image = e.target.photoURL.value
        const bid = e.target.bidOffer.value
        const phone = e.target.phone.value
        const id = _id
        console.log(email, name, image, bid, phone);

        const newBid = {
            product: id,
            buyer_image: image,
            buyer_name: name,
            buyer_contact: phone,
            buyer_email: email,
            bid_price: bid,
            status: "pending"
        }
        fetch('http://localhost:3000/bids', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                console.log('after bid ', data);

                if (data.insertedId) {
                    bidModalRef.current.close()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your bid has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    newBid._id = data.insertedId
                    setBids([...bids, newBid].sort((a,b) => b.bid_price - a.bid_price))
                }
            })


    }


    return (
        <div className="p-8 max-w-6xl mx-auto font-sans text-gray-800">
            {/* Back to Products */}
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-3">
                ← Back To Products
            </a>

            {/* Product Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center">
                    <span className="text-gray-500">Image</span>
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-2xl font-bold mb-2">{title}</h1>
                    <p className="text-lg font-semibold text-green-600 mb-3">
                        ${price_min} - {price_max} <span className="text-gray-500 text-sm">Price starts from</span>
                    </p>

                    {/* Product Details */}
                    <div className="border rounded-md p-3 mb-4">
                        <h2 className="text-sm font-semibold mb-1">Product Details</h2>
                        <p className="text-sm text-gray-600">
                            Product ID: <span className="font-medium">{_id}</span><br />
                            Posted on: <span className="font-medium">{created_at}</span>
                        </p>
                    </div>

                    {/* Seller Info */}
                    <div className="border rounded-md p-3 mb-4">
                        <h2 className="text-sm font-semibold mb-2">Seller Information</h2>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                            <div>
                                <p className="font-medium">{seller_name}</p>
                                <p className="text-xs text-gray-500">{email}</p>
                                <p className="text-xs text-gray-500">{seller_contact}</p>
                                <p className="text-xs text-gray-500">{location}</p>
                            </div>
                        </div>
                    </div>

                    <button onClick={handleModalRef} className="btn btn-primary w-full mt-3">I Want Buy This Product</button>
                </div>
            </div>

            {/* Product Description */}
            <div className="mt-10">
                <h2 className="text-lg font-semibold mb-2">Product Description</h2>
                <div className="border rounded-md p-4 text-sm text-gray-600">
                    <p><strong>Condition:</strong> {condition}</p>
                    <p><strong>Usage Time:</strong> {usage}</p>
                    <p className="mt-3">
                        {description}
                    </p>
                </div>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div>
                        <div className=" flex items-center justify-center ">
                            <div className=" w-full max-w-md p-8 rounded-lg shadow-lg">
                                {/* Header */}
                                <h2 className="text-2xl font-semibold text-center mb-6">
                                    Give Seller Your Offered Price
                                </h2>

                                {/* Form */}
                                <form onSubmit={handleBidSubmit} className="space-y-4">
                                    {/* Buyer Name & Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            readOnly
                                            name="name"
                                            defaultValue={user?.displayName}
                                            type="text"
                                            placeholder="Your name"
                                            className="input input-bordered w-full"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            defaultValue={user?.email}
                                            placeholder="Your Email"
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    {/* Buyer Image URL */}
                                    <input
                                        name="photoURL"
                                        type="url"
                                        defaultValue={user?.photoURL}
                                        placeholder="https://...your_img_url"
                                        className="input input-bordered w-full"
                                    />

                                    {/* Price */}
                                    <input
                                        type="text"
                                        name="bidOffer"
                                        placeholder="e.g. $30"
                                        className="input input-bordered w-full"
                                    />

                                    {/* Contact Info */}
                                    <input
                                        name="phone"
                                        type="text"
                                        placeholder="e.g. +1-555-1234"
                                        className="input input-bordered w-full"
                                    />

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3 pt-4">
                                        <button className="btn-primary px-6">Submit Bid</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* Bids (Visible to Owner) */}
            <div className="mt-12">
                <h2 className="text-lg font-semibold text-gray-600 opacity-80">Only Visible to Owner</h2>
                <div className="mt-2 flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-800">Bids For This Product:</h3>
                    <span className="text-indigo-600 font-semibold">{bids.length}</span>
                </div>

                {/* Bids Table */}
                <div className="overflow-x-auto mt-4 border rounded-lg">
                    <table className="table w-full">
                        <thead className="bg-gray-100">
                            <tr className="text-sm text-gray-600">
                                <th>SL No</th>
                                <th>Product</th>
                                <th>Buyer</th>
                                <th>Bid Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bids.map((bid, index) => (
                                <tr key={bid._id} className="hover:bg-gray-50">
                                    <td>{index + 1}</td>
                                    <td>{bid.product}</td>
                                    <td>{bid.buyer_name}</td>
                                    <td>{bid.bid_price}</td>
                                    <td className="flex gap-2">
                                        <button className="btn btn-sm bg-green-500 hover:bg-green-600 text-white">Accept Offer</button>
                                        <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white">Reject Offer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
