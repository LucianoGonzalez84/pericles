import React from 'react';
import FlexWrapper from '../FlexWrapper/FlexWrapper';
import Item from '../Item/Item';
import Loading from '../Loading/Loading'

// Estilos
import './itemlist.css'

function ItemList(props) {

    let emptyarray = props.productsList.length === 0;
    let titulo = "";

    if (props.style === undefined) {
        titulo = "Todas nuestras cervezas";
    } else {
        titulo = props.style
    }

    return (

        <div className='containeritemlist'>
            <FlexWrapper>
                {
                    emptyarray ?
                        <Loading></Loading>
                        :
                        <div className='title'>
                            <h1>{titulo}</h1>
                        </div>
                }
                {props.productsList.map((product) => (
                    <Item
                        key={product.id}
                        product={product}
                    />
                ))}
            </FlexWrapper>
        </div>
    )
}

export default ItemList;


