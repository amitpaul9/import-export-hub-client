import React from 'react';

const RecentProducts = ({ product }) => {
    console.log(product)
    return (
        <div>

            <div className="h-[500px] card bg-base-100 w-96 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-indigo-900 hover:text-white cursor-pointer">
                <figure>
                    <img className='h-[350px]'
                        src={product.image}
                        alt="produc image" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.title}</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default RecentProducts;