import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://strapi-store-server.onrender.com/api/products?featured=true")
      .then((response) => {
        setProducts(response.data?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleDetails = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-700 dark:text-white">
        Loading...
      </p>
    );
  }

  return (
    <div className="container mx-auto mt-20">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
            We are changing <br /> the way people shop
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/products")}
          >
            Explore Our Products
          </button>
        </div>
        {/* Carousel Section */}
        <div className="carousel carousel-center bg-neutral rounded-box max-w-lg space-x-4 p-4">
          {[
            "https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129805.jpg",
            "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
            "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
            "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
          ].map((src, index) => (
            <div key={index} className="carousel-item">
              <img src={src} className="rounded-box w-96" alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <h2 className="mt-20 font-bold text-4xl text-center mb-10">
        Featured Products
      </h2>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleDetails(product.id)}
            className="border border-transparent rounded-lg p-4 shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer text-center"
          >
            <img
              src={product.attributes.image}
              alt={product.attributes.title}
              className="w-full h-72 object-cover rounded"
            />
            <h2 className="font-semibold text-lg mt-2 text-gray-800 dark:text-white">
              {product.attributes.title}
            </h2>
            <h3 className="text-blue-600 font-bold mt-1">
              ${product.attributes.price}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
