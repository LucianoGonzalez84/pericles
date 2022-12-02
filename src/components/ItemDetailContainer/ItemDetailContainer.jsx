import React, { useState, useEffect } from 'react';
import ItemDetail from './ItemDetail';
import { getSingleProductFromDataBase } from '../../firebase/firebase';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';




function ItemDetailContainer() {
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let id = useParams().id;

    useEffect(() => {
        getSingleProductFromDataBase(id).then((productsDataBase) => {
            setProduct(productsDataBase);
            setIsLoading(false);
        })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
            .finally(() =>
                setIsLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if(isLoading) return <Loading></Loading>

    return <ItemDetail product={product} />
        
    ;
}

export default ItemDetailContainer;