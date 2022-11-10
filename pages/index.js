import React from "react";

// Importing Sanity Connection File
import { client } from "../lib/client";

// Importing HomeScreen Elements
import { FooterBanner, HeroBanner, Product } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner HeroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product}/>)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};
export default Home;

// Fetching Server Side Client Data
export const getServerSideProps = async () => {
  // Fetch all the products from santiy dashboard
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  // Fetch all the banner data from sanity dashboard
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};
