import { useState, createContext } from "react";
import Swal from 'sweetalert2';

const cartContext = createContext();

export function CartContextProvider(props) {
    const [cart, setCart] = useState([]);

    function addItem(itemData) {
        let itemFound = cart.find(itemInCart => itemInCart.id === itemData.id);

        if (itemFound) {
            let newCart = cart.map((itemInCart) => {
                if (itemInCart.id === itemData.id) {
                    itemInCart.quantity += itemData.quantity;
                    return itemInCart;
                } else {
                    return itemInCart
                }
            })
            setCart(newCart);
        }
        else {
            const newCart = [...cart];
            newCart.push(itemData);
            setCart(newCart);
        }
    }

    function totalItemsInCart() {
        let total = 0;
        cart.forEach(itemInCart => {
            total = total + itemInCart.quantity;
        })
        return total;
    }

    function totalPriceInCart() {
        let total = 0;

        cart.forEach(itemInCart => {
            total = total + (itemInCart.precio * itemInCart.quantity);
        })
        return total


    }

    function removeItem(itemId) {
        let newCart = cart.filter((itemInCart) => itemInCart.id !== itemId);
        setCart(newCart);

        // SweetAlert
        let producto = cart.find((itemInCart) => itemInCart.id === itemId);
        Swal.fire({
            icon: 'success',
            html: `<p>Se elimino <b><b><b>${producto.nombre}</b></b></b> del carrito</p>`,
            timer: '2000',
            showConfirmButton: false,
        })
    }

    function clear() {
        setCart([])        
    }
    
    const value = {
        cart,
        addItem,
        totalItemsInCart,
        totalPriceInCart,
        removeItem,
        clear,
    };

    return (
        <cartContext.Provider value={value}>
            {props.children}
        </cartContext.Provider>
    )
}

export default cartContext;
