import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImportExportHubContext } from '../../Contexts/importExportHubContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyExports = () => {
    const { user } = useContext(ImportExportHubContext)
    const [exports, setExport] = useState([]);
    const importModalRef = useRef(null);

    const handleExportModal = () => {
        importModalRef.current.showModal();
    }

    const handleExportUpdate = (e, _id) => {
        e.preventDefault();
        const name = e.target.name.value;
        const price = e.target.price.value;
        const origin = e.target.origin.value;
        const ratings = e.target.ratings.value;
        const quantity = e.target.quantity.value;
        const photo = e.target.photo.value;


        const updatedExport = {

            productName: name, productImage: photo,
            price: price, originCountry: origin, rating: ratings, availableQuantity: quantity, createdDate: new Date(), exporter_email: user.email, exporter_name: user.displayName, exporter_image: user.photoURL
        }
        e.target.reset();

        fetch(`http://localhost:3000/exports/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedExport)
        })
            .then(res => res.json())
            .then(data => {
                console.log('after updating', data);
                e.target.reset();
            })
            .catch(error => console.log("got error updating data", error))
    }

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/exports?exporter_email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setExport(data)
                })
                .catch(error => console.log("got an error fetching imports", error))
        }

    }, [user?.email])

    const handleImportDelete = (_id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/exports/${_id}`, {
                    method: 'DELETE',

                })

                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your import has been deleted.",
                                icon: "success"
                            });

                            const remainingImports = exports.filter(importedItem => importedItem._id != _id);
                            setExport(remainingImports);
                        }

                    })
                    .catch(error => console.log('got an error deleting data', error))
            }
        });


    }


    return (


        <div>
            <h2 className='text-center text-white text-2xl m-3 rounded-b-2xl bg-gradient-to-r  from-gray-900 to-indigo-900 py-4'>Your Imports</h2>

            {exports.length === 0 ? (
                <div className="text-center text-indigo-900 text-xl mt-20">
                    <p>You have no imports!</p>
                </div>
            ) : (

                exports.map(exportedItem => (<div>


                    <div className="overflow-hidden m-3 rounded-2xl text-white bg-indigo-900 mb-5 py-3 px-2 items-center justify-center">

                        <div className='flex justify-evenly gap-5 items-center'>
                            <div className=" h-12 w-12">
                                <img className='mask mask-squircle h-12 w-12'
                                    src={exportedItem.productImage}
                                    alt="Avatar Tailwind CSS Component" />
                            </div>

                            <div><div className="font-bold lg:text-xl md:text-xl text-xs"><h2>{exportedItem.productName}</h2></div>
                                <div className="text-sm opacity-50"><p>Origin: {exportedItem.originCountry}</p></div>
                            </div>

                            <div><h2 className='lg:text-xl md:text-xl text-[10px]'>Quantity: {exportedItem.availableQuantity}</h2></div>

                            <div><p className='lg:text-xl md:text-xl text-[10px]'>Price: {exportedItem.price}</p></div>


                            <div> <h2 className='lg:text-xl md:text-xl text-[10px]'>Rating: {exportedItem.rating}</h2></div>

                            <div className=' lg:text-xl md:text-xl text-[10px]'>
                                <Link onClick={handleExportModal} className='rounded-lg w-full px-5 py-2 text-white bg-gradient-to-r  from-gray-900 to-indigo-900'>Update</Link>
                            </div>

                            <div><button onClick={() => handleImportDelete(exportedItem._id)} className='text-2xl cursor-pointer' >❌</button></div>
                        </div>





                    </div>
                </div>)))}
            {/* modal  */}
            <dialog className="modal modal-bottom sm:modal-middle" ref={importModalRef}>
                <div className="modal-box ">
                    <h3 className="font-bold text-lg text-center text-black">Enter Update info</h3>
                    <div className='flex justify-self-end'><button className='btn btn-xs  ' onClick={() => importModalRef.current.close()}>❌</button></div>
                    <div className="modal-action flex flex-row justify-center">
                        <form method="dialog" onSubmit={handleExportUpdate}>
                            <fieldset className="fieldset rounded-box w-xs p-4 text-black">
                                <label className="label">Product Name</label>
                                <input type="text" name='name' className="input w-full" placeholder="Your product name" />

                                <label className="label">Product Photo URL</label>
                                <input type="url" name='photo' className="input w-full" placeholder="Your product photo URL" />

                                <label className="label">Product Price</label>
                                <input type="number" name='price' className="input w-full" placeholder="Your product price" />


                                <label className="label">Origin Country</label>
                                <input type="text" name='origin' className="input w-full" placeholder="Your product origin country" />


                                <label className="label">Ratings</label>
                                <input type="number" name='ratings' className="input w-full" placeholder="Your product rating (1 to 5)" />


                                <label className="label">Available quantity</label>
                                <input type="number" name='quantity' className="input w-full" placeholder="Available quantity your product" />


                                <button className="mt-3 btn text-white bg-gradient-to-r from-gray-900 to-indigo-900"  >Update</button>
                                <button className='btn btn-xs left-0 ' onClick={() => importModalRef.current.close()}>close</button>

                            </fieldset>

                        </form>
                    </div>
                </div>
            </dialog>

        </div>


    )
};

export default MyExports;