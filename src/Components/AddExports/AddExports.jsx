import React from 'react';

const AddExports = () => {
    return (
        <div className='flex justify-center mt-5 mb-8 flex-col text-center items-center'>
            <h1 className="fieldset-legend text-2xl">Add to Export</h1>
            <fieldset className="fieldset bg-white border-base-300 rounded-box w-lg border p-4">

                <label className="label">Product Name</label>
                <input type="text" className="input w-full" placeholder="Your product name" />

                <label className="label">Product Price</label>
                <input type="number" className="input w-full" placeholder="Your product price" />


                <label className="label">Origin Country</label>
                <input type="url" className="input w-full" placeholder="Your product origin country" />


                <label className="label">Rating</label>
                <input type="url" className="input w-full" placeholder="Your product rating (1 to 5)" />


                <label className="label">Available quantity</label>
                <input type="number" className="input w-full" placeholder="Available quantity your product" />

                <button className="btn bg-[#F4CF89] hover:transform-3d hover:bg-[#F4CF10]  mt-4">Add Export</button>
            </fieldset>
        </div >
    );
};

export default AddExports;