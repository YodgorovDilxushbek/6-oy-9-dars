import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    price: 1000,
    search: '',
    category: 'all',
    company: 'all',
    order: 'a-z',
  });
  const [filterMeta, setFilterMeta] = useState({});
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = (query = '') => {
    setLoading(true);
    axios
      .get(`https://strapi-store-server.onrender.com/api/products${query}`)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.data || []);
          setFilterMeta(response.data.meta || {});
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = `?search=${filters.search}&category=${filters.category}&company=${filters.company}&order=${filters.order}&price_lte=${filters.price}`;
    fetchProducts(query);
  };

  const handleReset = () => {
    setFilters({
      price: 1000,
      search: '',
      category: 'all',
      company: 'all',
      order: 'a-z',
    });
    fetchProducts();
  };

  const handleRedirect = (product) => {
    if (product.id) {
      navigate(`/details/${product.id}`);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="max-w-[1100px] w-full mx-auto my-[50px] flex flex-col gap-[30px] p-[30px] bg-[#181920] rounded-lg"
      >
        <div className="flex justify-between gap-[20px]">
          <label className="flex flex-col w-[23%] gap-[7px] text-[#f8f8f8] text-[16px]" htmlFor="product">
            Search Product
            <input
              id="product"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="bg-[#272935] border border-[#767575] text-[#f8f8f8] rounded-lg py-[5px] px-3 focus:outline-none focus:ring-2 focus:ring-[#f06292]"
              type="text"
            />
          </label>

          <label className="flex flex-col w-[23%] gap-[7px] text-[#f8f8f8] text-[16px]">
            Select Category
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="bg-[#272935] border border-[#767575] text-[#f8f8f8] rounded-lg py-[5px] px-3 focus:outline-none focus:ring-2 focus:ring-[#f06292]"
            >
              <option value="all">All</option>
              {filterMeta.categories &&
                filterMeta.categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </label>

          <label className="flex flex-col w-[23%] gap-[7px] text-[#f8f8f8] text-[16px]">
            Select Company
            <select
              value={filters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
              className="bg-[#272935] border border-[#767575] text-[#f8f8f8] rounded-lg py-[5px] px-3 focus:outline-none focus:ring-2 focus:ring-[#f06292]"
            >
              <option value="all">All</option>
              {filterMeta.companies &&
                filterMeta.companies.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
            </select>
          </label>

          <label className="flex flex-col w-[23%] gap-[7px] text-[#f8f8f8] text-[16px]">
            Sort By
            <select
              value={filters.order}
              onChange={(e) => handleFilterChange('order', e.target.value)}
              className="bg-[#272935] border border-[#767575] text-[#f8f8f8] rounded-lg py-[5px] px-3 focus:outline-none focus:ring-2 focus:ring-[#f06292]"
            >
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
              <option value="high">High Price</option>
              <option value="low">Low Price</option>
            </select>
          </label>
        </div>

        <div className="flex justify-between items-center gap-[20px]">
          <div className="flex flex-col gap-3 max-w-[240px] w-full text-[#f8f8f8] font-medium">
            <label htmlFor="price" className="flex justify-between items-center">
              <span>Select Price</span>
              <span>${filters.price.toFixed(2)}</span>
            </label>
            <input
              id="price"
              type="range"
              min="0"
              max="1000"
              value={filters.price}
              onChange={(e) => handleFilterChange('price', Number(e.target.value))}
              className="range range-secondary range-sm"
            />
          </div>

          <button
            type="submit"
            className="max-w-[230px] w-full px-6 py-[6px] bg-[#f06292] text-[#1b1c21] font-semibold rounded-lg hover:opacity-80 transition"
          >
            SEARCH
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="max-w-[230px] w-full px-6 py-[6px] bg-[#ffa726] text-[#1b1c21] font-semibold rounded-lg hover:opacity-80 transition"
          >
            RESET
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Puff visible={true} height={80} width={80} color="#fff" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-[1100px] w-full mx-auto py-12">
          {products.length === 0 ? (
            <p className="text-2xl text-center text-[#f8f8f8]">No products found.</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleRedirect(product)}
                className="text-[#F8F8F2] shadow-xl hover:shadow-2xl transition cursor-pointer p-4 rounded-2xl"
              >
                <img
                  src={product.attributes.image}
                  alt={product.attributes.title}
                  className="rounded-xl h-64 w-full object-cover"
                />
                <div className="text-center mt-4">
                  <h3 className="capitalize font-medium text-gray-400 text-lg">
                    {product.attributes.title}
                  </h3>
                  <p className="text-[#846eaa]">${product.attributes.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}

export default Product;
