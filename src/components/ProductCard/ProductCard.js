import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({
  title,
  category,
  image,
  description,
  rating,
  price,
  id,
  cart,
  setCart,
}) => {
  const navigate = useNavigate();

  //Product Details Navigation
  const handleNavigate = () => {
    navigate(`/${id}`);
  };

  const addToCart = (id, title, price, image) => {
    const obj = {
      id,
      title,
      price,
      image,
    };
let isPresent = false
    cart.forEach((product) => {
      if(id === product.id){
        console.log("Product already in cart");
        isPresent = true;
        return;
      }
  });

  if(isPresent) {
    toast.warning("Item already in the cart", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return;
  } else {
    console.log("cart", cart);
    setCart([...cart, {...obj, quantity:1}]);
    toast.success("Item is added to cart", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Card sx={{ maxWidth: 345 }} className="card-container">
        <CardMedia
          component="img"
          className="image"
          alt=""
          height="140"
          image={image}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {category}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {title.slice(0, 20)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleNavigate()}>
            Details
          </Button>
          <Button
            size="small"
            onClick={() => addToCart(id, title, price, image)}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
