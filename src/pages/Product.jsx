import React, {useState, useEffect} from "react";
import http from "../axios";
import { useNavigate } from "react-router-dom";
function Product() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        http
          .get("products")
          .then((response) => {
            if (response.status == 200) {
              setProducts(response.data.data);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

      function handleDetails(id) {
        navigate(`/products/${id}`);
      }

  return (
    <div>
      <div className="bg-blue-50 p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center space-x-6">
        <div className="w-1/4">
          <label className="block text-sm text-gray-700 mb-2">Search Product</label>
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="w-1/4">
          <label className="block text-sm text-gray-700 mb-2">Select Category</label>
          <select className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="all">all</option>
          </select>
        </div>

        <div className="w-1/4">
          <label className="block text-sm text-gray-700 mb-2">Select Company</label>
          <select className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="all">all</option>
          </select>
        </div>

        <div className="w-1/4">
          <label className="block text-sm text-gray-700 mb-2">Sort By</label>
          <select className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="a-z">a-z</option>
          </select>
        </div>
      </div>

      <div className="flex  items-center justify-between ">
      <div className="mt-6 flex justify-between items-center">
        <div className="w-1/2">
          <label className="block text-sm text-gray-700 mb-2">Select Price</label>
          <input
            type="range"
            min="0"
            max="7000"
            className="w-full"
            onChange={(e) => console.log(`Price: $${e.target.value}`)}
          />
          <div className="flex justify-between text-sm">
            <span>$0.00</span>
            <span>$1,000.00</span>
          </div>
        </div>

        <div className="w-1/4  items-center  ">
          <input type="checkbox" className="mr-2" />
          <label className="text-sm text-gray-700">Free Shipping</label>
        </div>
      </div>

      <div className="mt-6 flex gap-4 justify-end">
        <button className="px-36 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          SEARCH
        </button>
        <button className="px-36 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
          RESET
        </button>
      </div>
      </div>
    </div>
      <div className="grid grid-cols-3 gap-6 mt-10">
        {products.length > 0 &&
          products.map((product, index) => {
            return (
              <div
                key={index}
                onClick={() => handleDetails(product.id)}
                className="border border-transparent rounded-lg p-5 shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer text-center"
              >
                <img
                  src={product.attributes.image}
                  alt=""
                  className="w-full h-72 object-cover rounded"
                />
                <h2 className="font-semibold text-lg mt-2">
                  {product.attributes.title}
                </h2>
                <h3 className="text-blue-600 font-bold">
                  {product.attributes.price}$
                </h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Product;
