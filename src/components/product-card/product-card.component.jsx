import { useContext } from 'react';
import Button from '../button/button.componet';
import './product-card.styles.scss';
import { Cartcontext } from '../../context/cart.context';

// import Button from '../button/button.component';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const {addItemsToCart} = useContext(Cartcontext);
  const addProductToCart = () => addItemsToCart(product);
  return (
    <div className='product-card-cont   ainer'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>   
      <Button onClick ={addProductToCart }
       buttonType='inverted'>Add to card</Button>
    </div>
  );
};

export default ProductCard;