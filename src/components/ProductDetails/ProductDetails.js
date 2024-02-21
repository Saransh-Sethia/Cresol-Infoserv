import React,{useState, useEffect} from 'react';
import './ProductDetails.css';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from '@mui/material/Rating';

const ProductDetails = () => {
    const {productId} = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    const fetchDetails = async() => {
            try {
                const response = await axios.get(`${config.endpoint}/${productId}`);
                const result = (response.data);
                let resArr = [];
                resArr.push(result)
                console.log(resArr);
                setItems(resArr);
            } catch (error){
                console.log('error', error)
            }
        }

        useEffect(()=>{
            fetchDetails();
        },[]);
    

    const handleBackButton = () => {
        navigate('/');
    }
  return (
    <div className='details-container'>
      <div onClick={()=>handleBackButton()} className='back-page'>Back</div>

      {
        items ? (
            items.map((item, id) => (
                <div className="products-container" key={id}>
                    <div>
                        <img
                        className="image-2"
                        src={item.image}
                        alt="recipe" 
                        />
                    </div>
                    <div className="details-container">
                        <h2>Name {" "} - {" "} {item.title}</h2>                        
                        <h2>Category {" "} - {" "}{item.category}</h2>                       
                        <h2>Price {" "} - {" "}${item.price}</h2>                       
                        <Rating name="read-only" value={item.rating.rate} precision={0.5} readOnly />                        
                        <h2>Votes {" "} - {" "}{item.rating.count} upvotes</h2>                        
                        <div><h2>Description {" "} - {" "}</h2><h3>{item.description}</h3></div>
                    </div>
                  
                </div>
            ))
        ) : (
            <h2>No Product Found</h2>
        )
      }
    </div>
  )
}

export default ProductDetails
