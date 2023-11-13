import { useContext } from "react";
import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss"
import { Cartcontext } from "../../context/cart.context";

const CartIcon = () => {  
    const {isCartOpen ,setIsCartOpen } = useContext(Cartcontext);
    const {noOfItems} = useContext(Cartcontext);

    const toogleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }
    return (
      <div className='cart-icon-container' onClick={toogleIsCartOpen}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{noOfItems}</span>
      </div>
    );
  };
  
  export default CartIcon;
  