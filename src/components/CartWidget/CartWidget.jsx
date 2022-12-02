import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import cartContext from '../../storage/CartContext';
import { Link } from 'react-router-dom';

// Estilos
import "./cartwidget.css";

function CartWidget() {

  const { totalItemsInCart, totalPriceInCart } = useContext(cartContext);

  return (
    <Link to='/cart'>
      <div className='cartwidget'>
        {
          (totalItemsInCart() > 0) ?
            <>
              <FontAwesomeIcon className='cartwidget__icon' icon={faBeer} />
              <small className='cartwidget__count'>( {totalItemsInCart()} / $ {(totalPriceInCart()).toFixed(2)} )</small>
            </>
            :
            <>
              <FontAwesomeIcon className='cartwidget__icon' icon={faBeer} />
              <></>
            </>
        }
      </div>
    </Link>
  )
}

export default CartWidget;
