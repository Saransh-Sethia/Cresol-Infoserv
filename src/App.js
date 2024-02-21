
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import {auth} from './firebase';
import {useEffect, useState} from 'react';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';

function App() {
const [userName, setUserName] = useState("");
const [cart, setCart] = useState([]);
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUserName(user.displayName)
      } else {
        setUserName('');
      }
    })
  }, [])
  return (
    <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home name={userName} cart={cart} setCart={setCart}/>} />
          <Route path="/:productId" element={<ProductDetails />}></Route>
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
