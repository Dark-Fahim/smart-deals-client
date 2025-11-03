import React from 'react';
import Banner from '../components/Banner';
import LatestProducts from './LatestProducts';

const latestProductsPromise = fetch('http://localhost:3000/latest-products').then(res => res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
        </div>
    );
};

export default Home;