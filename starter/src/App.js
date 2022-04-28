import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import {calculateTotal, getCartItems} from './features/cart/cartSlice'
import {useDispatch, useSelector} from 'react-redux'
import React from "react";
import Modal from "./components/Modal";
function App() {
  const dispatch = useDispatch()
  const { cartItems, isLoading } = useSelector(state => state.cart)
  const { isOpen } = useSelector(state => state.modal)

  React.useEffect(() => {
      dispatch(calculateTotal())
  }, [cartItems])
  React.useEffect(() => {
    dispatch(getCartItems('if i want to do anything'))
  }, [])

  if(isLoading){
    return <div className="loading">
      <h1>Loading...</h1>
    </div>
  }
  return (

    <main>
      {isOpen && <Modal />}
      
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
