import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Puff } from 'react-loader-spinner';
import burgerBold from '../assets/img.svg'
import burger from '../assets/burger.svg'


function Product() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState(1000);
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [company, setCompany] = useState('all')
  const [order, setOrder] = useState('a-z')
  const [filterProduct, setFilterProduct] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true);
    axios.get(`https://strapi-store-server.onrender.com/api/products`)
      .then(response => {
        console.log(response);
        if (response.status === 200 && response.data) {
          setProducts(response.data.data);
          setFilterProduct(response.data.meta);
        } else {
        }
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  function handleRedirect(id) {
    navigate(`/products/${id}`)
  }

  function handleSearch(event) {
    event.preventDefault()
    axios.get(`https://strapi-store-server.onrender.com/api/products?search=${search}&category=${category}&company=${company}&order=${order}&page=${0}`)
      .then(response => {
        if (response.status == 200) {
          if (response.data) {
            setProducts(response.data.data)
            setFilterProduct(response.data.meta)
          } else {
          }
        }
      })
      .catch(err => {
        console.log(err);
        navigate('/products')
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <form className='max-w-[1100px] w-full mx-auto my-[50px] flex flex-col gap-[30px] p-[30px] bg-[#181920] rounded-lg'>
        <div className="flex justify-between gap-[20px]">
          <label className="flex flex-col w-[23%]  gap-[7px] text-[#f8f8f8] text-[16px]" htmlFor="product">
            Search Product
            <input id="product" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-[#272935] border border-[#767575] text-[#f8f8f8] rounded-lg py-[5px] px-3 focus:outline-none focus:ring-2 focus:ring-[#f06292]" type="text" />
          </label>
          <label className="flex flex-col w-[23%] gap-[7px] text-[#f8f8f8] text-[16px]" htmlFor="category">
            Select Category
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-[#272935]  border border-[#767575] text-[#f8f8f8] rounded-lg py-[5px] px-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f06292]">
              {filterProduct && filterProduct.categories && filterProduct.categories.length > 0 ? (
                filterProduct.categories.map((value, index) => (
                  <option key={index} value={value}>{value}</option>
                ))
              ) : (
                <option value="all">No categories available</option>
              )}
            </select>
          </label>
          <label className="flex flex-col w-[23%]  gap-[7px] text-[#f8f8f8] text-[16px]" htmlFor="company">
            Select Company
            <select value={company} id="company" onChange={(e) => setCompany(e.target.value)} className="bg-[#272935]  border border-[#767575] text-[#f8f8f8] rounded-lg py-[5px] px-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f06292]">
              {
                filterProduct && filterProduct.companies && filterProduct.companies.length > 0 ? (
                  filterProduct.companies.map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                  ))
                ) : (
                  <option value={'all'}>No companies available</option>
                )
              }
            </select>
          </label>
          <label className="flex flex-col  w-[23%] gap-[7px] text-[#f8f8f8] text-[16px]" htmlFor="sort">
            Sort By
            <select value={order} id="sort" onChange={(e) => setOrder(e.target.value)} className="bg-[#272935] text-[#f8f8f8] border border-[#767575] rounded-lg py-[5px] px-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f06292]">
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
              <option value="high">high</option>
              <option value="low">low</option>
            </select>
          </label>
        </div>
        <div className='flex  justify-between gap-[20px] items-center'>
          <div className="flex flex-col gap-3 max-w-[240px] w-full text-[#f8f8f8] font-medium">
            <label htmlFor="price" className="flex justify-between items-center">
              <span>Select Price</span>
              <span>${price.toFixed(2)}</span>
            </label>
            <input id="price" type="range" min="0" max="1000" step="1" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="range range-secondary range-sm"/>
            <div className="flex justify-between text-sm">
              <span>0</span>
              <span>Max: $1,000.00</span>
            </div>
          </div>
          <div className="max-w-[230px] w-full">
            <label htmlFor="checkbox" className="flex flex-col items-center w-full gap-[7px] text-[#f8f8f8] text-[16px]">
              Free shopping
              <input id="checkbox" type="checkbox" className="checkbox checkbox-secondary checkbox-sm" />
            </label>
          </div>
          <button onClick={handleSearch} className="max-w-[230px] w-full active:scale-95 px-6 py-[6px] bg-[#f06292] text-[#1b1c21] font-semibold rounded-lg hover:opacity-80 transition">
            SEARCH
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              setLoading(true);

              axios.get(`https://strapi-store-server.onrender.com/api/products`)
                .then((response) => {
                  if (response.status === 200 && response.data) {
                    setProducts(response.data.data);
                    setFilterProduct(response.data.meta);
                    setPrice(1000);
                    setSearch('');
                    setCategory('all');
                    setCompany('all');
                    setOrder('a-z');
                  }
                })
                .catch((err) => {
                  console.error(err);
                })
                .finally(() => setLoading(false));
            }}
            className="max-w-[230px] w-full px-6 py-[6px] active:scale-95 bg-[#ffa726] text-[#1b1c21] font-semibold rounded-lg hover:opacity-80 transition">
            RESET
          </button>
        </div>
      </form >
      <div className='max-w-[1100px] w-full mx-auto'>
        <div className='border-b border-base-300 pb-5 text-[#F8F8F2] flex justify-between'>
          <h2 className='text-3xl font-medium tracking-wider text-[17px]'>{filterProduct.pagination && filterProduct.pagination.total} products</h2>
          <div className="flex gap-x-2">
            <button type="button" className="text-xl btn btn-circle btn-sm hover:bg-[#FF7AC6]  bg-[#FF7AC6] text-primary-content">
              <img src={burgerBold} />
            </button>
            <button type="button" className="text-xl btn btn-circle btn-sm btn-ghost text-based-content">
              <img src={burger} className='text-white' />
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className='w-full pt-[250px] max-h-[500px] h-full flex justify-center items-center'>
          <Puff visible={true} height="80" width="80" color="#fff" ariaLabel="puff-loading" />
        </div>
      )}
      <div className='py-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-[1100px] w-full mx-auto'>
        {
          products.length == 0 ? (
            <p className='text-2xl mt-16 w-[1000px] mx-auto text-[#f8f8f8]'>Sorry, no products matched your search...</p>
          ) : products.map(function (product, index) {
            return (
              <div onClick={() => { handleRedirect(product.id) }} key={index} className='text-[#F8F8F2] w-full shadow-xl hover:shadow-2xl transition cursor-pointer select-none duration-300 p-4 rounded-2xl'>
                <img src={product.attributes.image} className='rounded-xl h-64 md:h-48 w-full object-cover' />
                <div className='card-body items-center text-center p-6 flex flex-col gap-2'>
                  <h3 className='capitalize font-medium text-gray-400 text-[20px]'>{product.attributes.title}</h3>
                  <p className='text-[#846eaa]'>${product.attributes.price}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Product
