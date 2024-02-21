import React, {useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProductCard from "./ProductCard";



export default function Products({ products, setProducts, sortBy, handleNavigate, fetchApi, cart, setCart, categoryFilter }) {

  const [filteredData, setFilteredData] = useState([]);  

    //Delete
// const handleDelete = (productId) => {
//   const deleteValue = products.filter((product) => product.id !== productId);
//   setProducts(deleteValue)
// }


//Sort By
 const applyFilter = (filteredData, sortBy, categoryFilter, products) => {
  let updatedData = [...filteredData];

  if (categoryFilter.length) {
    updatedData = updatedData.filter((cat) =>
      categoryFilter.includes(cat.category)
    );
  }

  if(sortBy === "Low to High"){
    updatedData.sort((firstListing, secondListing) => 
    firstListing.price - secondListing.price
    )
  } else if(sortBy === "High to Low"){
    updatedData.sort((firstListing, secondListing)=> 
    secondListing.price - firstListing.price
    )
  };
  console.log('updatedData', updatedData);
  return updatedData;
 };

 let displayData = applyFilter(filteredData, sortBy, categoryFilter);

 useEffect(() => (
  setFilteredData(products)
 ),[products])

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2} className="grid-container" sx={{paddingLeft:'20px', paddingRight:'20px', paddingTop:'50px', paddingBottom:'50px'}}>
        {displayData.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
            <ProductCard {...product} setProducts={setProducts} cart={cart} setCart={setCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}