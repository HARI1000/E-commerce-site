import { createContext,useState,useEffect} from "react";

const addCartItems = (cartItems , productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem)=>{
            return cartItem.id === productToAdd.id;
        });
    if(existingCartItem) {
        const answer= cartItems.map((cartItem)=>{
            if(cartItem.id === productToAdd.id) 
            {return {...cartItem,quantity: cartItem.quantity+1}}
            else
            {return cartItem;}
        })
        console.log(answer);
        return answer;
    }
    else
    {
        return [...cartItems,{...productToAdd,quantity:1}];
    }
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem)=>
    {return cartItem.id === cartItemToRemove.id});

    if(existingCartItem.quantity === 1) 
    {
        return cartItems.filter((cartItem)=> cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map((cartItem)=>
    cartItem.id === cartItemToRemove.id ?
    {...cartItem,quantity: cartItem.quantity-1}:cartItem);
}   

const clearCartItems = (cartItems,cartItemToClear) => {
    return cartItems.filter((cartItem)=> cartItem.id !==cartItemToClear.id);
}

export const Cartcontext = createContext({
    isCartOpen:false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemsToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    noOfItems: 0,
    cartTotal:0,
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [noOfItems,setNoOfItems] = useState(0);
    const [cartTotal,setCartTotal] = useState(0);

    useEffect(() => {
        const tempNoItems = cartItems.reduce(
            (total,cartItem)=> total + cartItem.quantity,
            0);
        setNoOfItems(tempNoItems);
    },[cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total,cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
        setCartTotal(newCartTotal);
    },[cartItems])
    
    const addItemsToCart = (productToAdd) => {  
        setCartItems(addCartItems(cartItems,productToAdd));
    }
    const clearItemFromCart= (cartItemToClear) => {
        setCartItems(clearCartItems(cartItems,cartItemToClear));
    };
    const removeItemToCart= (productToRemove) => {
        setCartItems(removeCartItem(cartItems,productToRemove));
    };
    const value={isCartOpen, setIsCartOpen,cartItems,addItemsToCart,noOfItems,removeItemToCart,clearItemFromCart,cartTotal};
    return(
        <Cartcontext.Provider value={value}>
            {children}
        </Cartcontext.Provider>
    )
}