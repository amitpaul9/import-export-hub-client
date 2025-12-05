import React, { useContext, useRef, useState, } from 'react';
import { Link, useLoaderData } from 'react-router';
import { ImportExportHubContext } from '../../Contexts/importExportHubContext';
import Swal from 'sweetalert2';


const ProductsDetails = () => {
    const loadedProduct = useLoaderData();
    const [product, setproduct] = useState(loadedProduct);
    const importModalRef = useRef(null);

    const { user } = useContext(ImportExportHubContext);
    const [isDisable, setIsDisable] = useState(false);


    const handleImportModal = () => {
        importModalRef.current.showModal();
    }

    const handleImportButtonDisable = (e) => {
        const quantity = parseInt(e.target.value) || 0;
        if (quantity > product.availableQuantity || quantity <= 0) {
            setIsDisable(true)
        }
        else {
            setIsDisable(false)
        }
    }

    const handleImport = (e) => {
        e.preventDefault();
        const email = user.email;
        const name = user.displayName;
        const quantity = parseInt(e.target.quantity.value)



        const newImport = {
            product_image: product.productImage, product_rating: product.rating, product_origin: product.originCountry, product_price: product.price, product_id: product._id, email: email, name: name, import_quantity: quantity, product_name: product.productName
        }

        fetch('https://import-export-hub-server-lake.vercel.app/imports', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newImport)
        }).then(res => res.json()).then(data => {
            console.log('after submiting import', data);

            setproduct(prevProduct => ({
                ...prevProduct,
                availableQuantity: prevProduct.availableQuantity - quantity
            }))
            importModalRef.current.close();


            Swal.fire({
                title: "Success",
                text: "Import successfully added!",
                icon: "success"
            });

        })
            .catch(err => console.log('got and error submitting import', err))

        e.target.reset();
    }


    if (!product || !product._id) {
        return (
            <div className="flex flex-col items-center mt-20">
                <h1 className="text-4xl font-bold text-red-600">404</h1>
                <p className="text-xl mt-2">Product Not Found</p>
                <Link to="/" className="mt-4 underline text-blue-600">Go Back Home</Link>
            </div>
        );
    }


    return (
        <div className='p-8 flex lg:flex-row md:flex-row flex-col gap-3 md:gap-5 lg:gap-12 '>
            <title>Product - IE Hub</title>
            <div>
                <img className='w-[800px] h-[400px]' src={product.productImage} alt="" />
            </div>
            <div className='w-full '>
                <h1 className='text-2xl mt-3 mb-2 font-bold'>{product.productName}</h1>
                <div className='bg-[#1a237e20] py-2 px-5 w-full rounded-lg'>
                    <h1 className='text-indigo-900 text-xl font-bold'>Product Details</h1>

                    <div className='text-left mt-2'>
                        <p className='  '>Price: ${product.price}</p>
                        <h3 className=''>Available Quantity: {product.availableQuantity}</h3>
                    </div>
                </div>
                <div className='bg-[#1a237e20] py-2 px-5 w-full rounded-lg mt-3'>

                    <div className='text-left mt-2'>
                        <p className='  '>Product ID: {product._id}</p>
                        <p className='  '>Origin: {product.originCountry}</p>
                        <h3 className=''>Created at: {product.createdDate}</h3>
                    </div>
                </div>

                <div className='mt-8 '>
                    <Link onClick={handleImportModal} className='rounded-lg w-full px-5 py-2 text-white bg-gradient-to-r  from-gray-900 to-indigo-900'>Import Now</Link>

                    {/* modal  */}
                    <dialog className="modal modal-bottom sm:modal-middle" ref={importModalRef}>
                        <div className="modal-box ">
                            <h3 className="font-bold text-lg text-center">Enter info</h3>
                            <div className='flex justify-self-end'><button className='btn btn-xs  ' onClick={() => importModalRef.current.close()}>❌</button></div>

                            <div className="modal-action flex flex-row justify-center">
                                <form method="dialog" onSubmit={handleImport}>
                                    <fieldset className="fieldset rounded-box w-xs p-4">
                                        <label className="label">Name</label>
                                        <input type="email" className="input" defaultValue={user.displayName} readOnly />

                                        <label className="label">Email</label>
                                        <input type="text" className="input" defaultValue={user.email} readOnly />

                                        <label className="label">Quantity</label>
                                        <input required onChange={handleImportButtonDisable} type="number" name='quantity' className="input" placeholder='Enter Import Quantity' />
                                        <button disabled={isDisable} className={`mt-3 btn text-white ${isDisable ? 'bg-gray-400' : 'bg-gradient-to-r from-gray-900 to-indigo-900'}`} > Import</button>


                                    </fieldset>

                                </form>

                            </div>
                        </div>
                    </dialog>


                </div>


            </div >
        </div >
    );
};

export default ProductsDetails;