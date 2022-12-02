import React, { useState, useContext } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import cartContext from '../../storage/CartContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// Estilos
import './itemdetail.css';

function ItemDetail({ product }) {
    const [isInCart, setIsInCart] = useState(false);
    const { addItem } = useContext(cartContext);

    function handleAddToCart(quantity) {
        const itemForCart = {
            ...product,
            quantity
        }
        setIsInCart(true);
        addItem(itemForCart);

        // SweetAlert
        Swal.fire({
            icon: 'success',
            html: `<p>Se agregaron <b><b><b>${itemForCart.quantity}</b></b></b> unidad/es de <b><b><b>${itemForCart.nombre}</b></b></b> al carrito</p>`,
            timer: '2000',
            showConfirmButton: false,
        })
    }

    return (
        <div className='detailcontainer'>
            <div className='detailcontainer__nombre'>
                <h2 >{product.nombre}</h2>
            </div>
            <div className='detailcontainer__info'>
                <div className='info__img' >
                    <img src={product.imagen} alt={product.nombre} />
                </div>
                <div className='info'>
                    {!isInCart ? (
                        <>
                            <div className='info__info'>
                                <p className='info__precio'>$ {product.precio}.00</p>
                                <div className='info__contador'>
                                    <ItemCount handleAddToCart={handleAddToCart} stock={product.stock}></ItemCount>
                                </div>
                                <p className='info__stock'>* Stock disponible {product.stock} unidades</p>
                            </div>
                            <p className='info__descripcion'>{product.descripcion}</p>
                        </>
                    ) : (
                        <>
                            <div className='info__info'>
                                <Link to='/cart'><button className='btngotocart'>Ir al carrito</button></Link>
                                <Link to='/'><button className='btngotocart'>Seguir comprando</button></Link>
                            </div>
                            <p className='info__descripcion'>{product.descripcion}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;