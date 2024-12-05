  import React, { useEffect, useState } from "react";
  import axios from "../axios";
  import { useNavigate } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();
  
    useEffect(() => {
      axios
        .get("https://strapi-store-server.onrender.com/api/products?limit=3")
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
    <div className="container mx-auto mt-20 m- justify-center">
    <div className="flex gap-1">
      <div className="w-[1900px] ">
        <h1 className="text-7xl w-96 w-full font-bold  text-gray-400 mb-10">
          We are changing <br /> the way people <br /> shop
        </h1>
        <p className="w-full font-medium mb-10">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br /> Tempore
          repellat explicabo enim soluta temporibus asperiores <br /> aut obcaecati
          perferendis porro nobis.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/products");
          }}
        >
          Our products
        </button>
      </div>
      
      <div className="carousel carousel-center bg-neutral rounded-box max-w-lg space-x-4 p-4">
  <div className="carousel-item">
    <img
      src="https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129805.jpg"
      className="rounded-box w-96 " />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129805.jpg"
      className="rounded-box  w-96" />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
      className="rounded-box" />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
      className="rounded-box" />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
      className="rounded-box" />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
      className="rounded-box" />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
      className="rounded-box" />
  </div>
</div>

    </div>
    <h2 className="mt-32 font-bold text-4xl mb-5">Featured products</h2>
    <hr />
    <div className="grid grid-cols-3 gap-6 mt-10">
      {products.length > 0 &&
        products.slice(0, 3).map((product, index) => {
          return (
            <div
              key={index}
              onClick={() => handleDetails(product.id)}
              className="border border-transparent rounded-lg p-4 shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer text-center"
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
                {product.attributes.price} $
              </h3>
            </div>
          );
        })}
    </div>
  </div>
  )
}

export default Home