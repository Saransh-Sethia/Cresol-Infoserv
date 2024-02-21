import React,{useState, useEffect} from "react";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = ({ cart, setCart }) => {
    const [price, setPrice] = useState(0);
    const [CART, setCART] = useState([]);
    const navigate = useNavigate()


    useEffect(()=>{
      setCART(cart);
    },[cart]);

    const handleNavigate = () => {
        navigate('/');
    }

    const clearCart = () => {
        setCart([]);
    }
  return (
    
        CART.length !== 0 ? (
            <>
            <Box sx={{ width: "100%" }}>
            <Grid
              container
              spacing={2}
              className="grid-container"
              sx={{
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "50px",
                paddingBottom: "50px",
              }}
            >
              {CART.map((product, productIndex) => (
                <Grid item xs={12} sm={12} md={12} lg={12} key={product.id} className="cart-container">
                  <Card sx={{ height:'100px' , width:'150px' }} >
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image={product.image}
                      className="image"
                    />
                  </Card>
                  <div className="details-container">
                  <Typography gutterBottom variant="h5" component="div" className="heading">
                    {product.title}
                  </Typography>
                  <div className="price-container">
                  <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="div" 
                  onClick={()=>{
                   const _CART = CART.map((item, index) => {
                    return productIndex === index ? {...item, quantity: product.quantity - 1} : item
                  })
                   setCART(_CART)
                  }}>
                    {product.quantity > 1 ? <RemoveIcon /> : null} 
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.quantity}
                  </Typography>
                  <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="div" 
                  onClick={()=>{
                    const _CART = CART.map((item, index) => {
                     return productIndex === index ? {...item, quantity: product.quantity + 1} : item
                   })
                    setCART(_CART)
                   }}
                  >
                    {product.quantity < 10 ? <AddIcon /> : null}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    ${product.price * product.quantity}
                  </Typography>

                  </div>
                  <div onClick={(id) => {
                    const _cart = CART.filter(() => product.id !== id)
                    setCART(_cart)
                  }}>Remove</div>
                  </div>

                </Grid>
              ))}
            </Grid>
            <h1 className="order-total">Order Total : 
            ${CART.map((item) => item.price * item.quantity).reduce((total,n) => total + n)}</h1>
          </Box>
          <div className="cart-footer">
            <div className="back-to-shopping" onClick={()=>handleNavigate()}>Continue Shopping</div>
            <div className="back-to-shopping" onClick={()=>clearCart()}>Clear Cart</div>
          </div>
          </>
        ) : (
            <>
            <h2>No Items in the Cart !</h2>
            <div className="back-to-shopping" onClick={()=>handleNavigate()}>Continue Shopping</div>
            </>
        )
    
  );
};

export default Cart;
