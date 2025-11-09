import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBids = () => {
    const { user } = useContext(AuthContext)
    const [bids, setBids] = useState([])
    const axiosSecure = useAxiosSecure()
    //   const bids = Array.from({ length: 10 }, (_, i) => ({
    //     id: i + 1,
    //     product: "Orange Juice",
    //     price: "$22.5",
    //     seller: "Sara Chen",
    //     email: "crafts.by.sara@shop.net",
    //     bidPrice: "$10",
    //     status: "Pending",
    //   }));

    useEffect(() => {
        axiosSecure.get(`/bids?email=${user.email}`)
        .then(data => {
            setBids(data.data)
        })
    },[axiosSecure, user.email])

    // useEffect(() => {
    //     fetch(`https://smart-deals-server-three-alpha.vercel.app/bids?email=${user.email}`, {
    //         headers: {
    //             // authorization: `Bearer ${user.accessToken}`
    //             authorization: `Bearer ${localStorage.getItem('token')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setBids(data)
    //         })
    // }, [user?.accessToken, user?.email])

    const handleBidDelete = id => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://smart-deals-server-three-alpha.vercel.app/bids/${id}`, {
                    method: 'DELETE',

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('after delete', data);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });
                            const remaining = bids.filter(bid => bid._id !== id)
                            setBids(remaining)
                        }
                    })

            }
        });


    }



    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center py-10">
            <h2 className="text-3xl font-bold mb-8">
                My Bids: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#632EE3] to-[#9F62F2]">{bids.length}</span>
            </h2>

            <div className="overflow-x-auto w-11/12 lg:w-3/4 bg-base-100 rounded-2xl shadow-md">
                <table className="table table-zebra w-full">
                    <thead className="text-gray-700 bg-base-300">
                        <tr>
                            <th>SL No</th>
                            <th>Product</th>
                            <th>Seller</th>
                            <th>Bid Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.map((bid, idx) => (
                            <tr key={bid._id}>
                                <td>{bid.id}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12 bg-gray-200"></div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{bid.product}</div>
                                            <div className="text-sm opacity-70">{bid.price}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-circle w-10 h-10 bg-gray-200"></div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{bid.buyer_name}</div>
                                            <div className="text-sm opacity-70">{bid.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{bid.bid_price}</td>
                                <td>
                                    {
                                        bid.status === 'pending' ? <span className="badge badge-warning badge-outline">{bid.status}</span> :
                                            <span className="badge badge-success badge-outline">{bid.status}</span>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => (handleBidDelete(bid._id))} className="btn btn-outline btn-error btn-sm">
                                        Remove Bid
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;
