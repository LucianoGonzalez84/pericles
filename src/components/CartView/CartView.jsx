import React, { useContext } from 'react';
import cartContext from '../../storage/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { createBuyOrderFirestore } from '../../firebase/firebase';
import Swal from 'sweetalert2';
import Form from '../Form/Form';

// Estilos
import "./cartview.css";

function CartView() {
    const { cart, removeItem, clear, totalPriceInCart } = useContext(cartContext);
    const navigate = useNavigate();

    function createBuyOrder(userData) {
        const buyData = {
            buyer: userData,
            items: cart,
            total: totalPriceInCart(),
            date: new Date(),
        }

        createBuyOrderFirestore(buyData).then(orderId => {
            clear();
            // SweeAlert
            Swal.fire({
                icon: 'success',
                html: `<p>Gracias por tu compra <b><b>${buyData.buyer.name}</b></b>. El identificador de tu orden es: <b><b>${orderId}</b></b><br><p>Click en OK para volver a la pagina principal</p>`,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            })
        });
    }

    return (
        <div className='cartcontainer'>
            <div className='cart_titulos'>
                <h3>Producto</h3>
                <h3>Cantidad</h3>
                <h3>Precio</h3>
                <h3>Sub-Total</h3>
            </div>
            <div className='cart'>
                {cart.length === 0 ?
                    <div className='carritovacio'>
                        <div >
                            <h3>El carrito se encuentra vacio <FontAwesomeIcon className='cart_trash' icon={faFaceFrown} /> </h3>
                        </div>
                    </div>
                    :
                    (cart.map((cartItem) => (
                        <div className='cart_info'>
                            <div>
                                <div>
                                    <button onClick={() => removeItem(cartItem.id)}><FontAwesomeIcon className='cart_trash' icon={faTrashCanArrowUp} /></button>
                                </div>
                                <img src={cartItem.imagen} alt={cartItem.nombre} />
                                <p>{cartItem.nombre}</p>
                            </div>
                            <div>
                                <p>{cartItem.quantity}</p>
                            </div>
                            <div>
                                <p>$ {(cartItem.precio).toFixed(2)}</p>
                            </div>
                            <div>
                                <p>$ {(cartItem.precio * cartItem.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    )))
                }
            </div>
            <div className='total'>
                <div >
                    <h3>Total: $ {(totalPriceInCart()).toFixed(2)}</h3>
                </div>
            </div>
            <div className='btns'>
                <Link to='/'><button className='btn'>Seguir comprando</button></Link>
                <button className={cart.length === 0 ? 'btnnull' : 'btn'} onClick={cart.length === 0 ? null : () => clear()}>Vaciar carrito</button>
            </div>
            {cart.length === 0 ?
                <>
                </>
                :
                <Form onSubmit={createBuyOrder}></Form>
            }
        </div>
    )
}

export default CartView

