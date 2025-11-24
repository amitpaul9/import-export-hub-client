import React from 'react';
import { useLoaderData } from 'react-router';

const ProductsDetails = () => {
    const product = useLoaderData();
    console.log(product);

    return (
        <div>
            <h3>This is prodict details page</h3>
        </div>
    );
};

export default ProductsDetails;