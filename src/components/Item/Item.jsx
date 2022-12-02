import React from "react";
import Button from "../Button/Button";
import { Link } from 'react-router-dom';

// Estilos
import "./item.css";

function Item({product}) {

  let urlDetail = `/detalle/${product.id}`;

  return (
    <div className="card">
      <div className="card__img">
        <img src={product.imagen} alt={product.nombre} />
      </div>
      <p className="card__nombre">{product.nombre}</p>
      <p className="card__estilo">{product.estilo}</p>
      <p className="card__info">
        {product.tamaño} │ {product.alcohol} │ {product.ibu}
      </p>
      <p className="card__precio">$ {product.precio}.00</p>
      <Link to={urlDetail}>
        <Button className='card__btnadd'>Ver mas</Button>
      </Link>      
    </div>
  );
}

export default Item;
