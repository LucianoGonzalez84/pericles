import React, { useState } from "react";
import Button from "../Button/Button";

function Count({ stock, handleAddToCart }) {
  const [cantidad, setCantidad] = useState(1);

  function handleDecrement() {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  }

  function handleIncrement() {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  }

  return (
    <div className="containercount">
      <div className="count">
        <Button className="count__btn" onClick={handleDecrement}>
          -
        </Button>
        <div className="count__amount">{cantidad}</div>
        <Button className="count__btn" onClick={handleIncrement}>
          +
        </Button>
      </div>
      <Button onClick={() => handleAddToCart(cantidad)} className='count__btnadd'>Agregar</Button>
    </div>
  );
}

export default Count;
