
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import config from "../../config";
import Box from "@mui/material/Box";
import SearchBar from "../SearchBar/SearchBar";
import Products from "../ProductCard/Products";
import Sort from "../Sort/Sort";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import CheckboxFilter from "../../CheckboxFilter/CheckboxFilter";

function Home(props) {
  const {name, cart, setCart} = props;
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const keys = ["title", "category"];
  const [categoryFilter, setCategoryFilter] = useState([]);
  const navigate = useNavigate();

  const fetchApi = async () => {
    try {
      const response = await axios.get(config.endpoint);
      const result = response.data;
      console.log(result);
      setProducts(result);
    } catch (error) {
      console.log("error 1", error);
    }
  };

  const search = (data) => {
    let updatedData =  data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
    setProducts(updatedData);
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setQuery(event.target.value);
  };

  const handleSortByChange = (e) => {
    console.log(e.target.value);
    setSortBy(e.target.value);
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleCategoryFilterChange = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setCategoryFilter((prevVal) => [...prevVal, event.target.value]);
    } else {
      setCategoryFilter((prevVal) =>
        prevVal.filter((item) => item !== event.target.value)
      );
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    search(products);
  }, [query]);


  return (
  <>
  <Navbar name={name} />
  <div className="header-container">
        <Box>
          <SearchBar query={query} handleSearch={handleSearch} />
        </Box>
        <div className="sort-by">
          <h2>Sort By:</h2>
          <Sort handleSortByChange={handleSortByChange} sortBy={sortBy} />
        </div>
        <Stack spacing={2} direction="row">
          <Badge badgeContent={cart.length} color="primary">
            <ShoppingCartIcon
              color="action"
              onClick={() => handleCart()}
              className="cart-container"
            />
          </Badge>
        </Stack>
      </div>
      <div className="product-filter">
        <CheckboxFilter
          categoryFilter={categoryFilter}
          handleCategoryFilterChange={handleCategoryFilterChange}
        />
        <Products
          cart={cart}
          setCart={setCart}
          products={products}
          setProducts={setProducts}
          sortBy={sortBy}
          categoryFilter={categoryFilter }
          // handleNavigate={handleNavigate}
        />
      </div>
  </>
  )
}

export default Home;