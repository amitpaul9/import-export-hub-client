import React, { useContext, useEffect, useState } from 'react';
import { ImportExportHubContext } from '../../Contexts/importExportHubContext';
import Swal from 'sweetalert2';

const MyImports = () => {
    const { user } = useContext(ImportExportHubContext)
    const [imports, setImports] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/imports?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setImports(data)
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
                fetch(`http://localhost:3000/imports/${_id}`, {
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

                            const remainingImports = imports.filter(importedItem => importedItem._id != _id);
                            setImports(remainingImports);
                        }

                    })
                    .catch(error => console.log('got an error deleting data', error))
            }
        });
    }


    return (


        <div>
            <h2 className='text-center text-white text-2xl m-3 rounded-b-2xl bg-gradient-to-r  from-gray-900 to-indigo-900 py-4'>Your Imports</h2>

            {imports.length === 0 ? (
                <div className="text-center text-indigo-900 text-xl mt-20">
                    <p>You have no imports!</p>
                </div>
            ) : (

                imports.map(importedItem => (<div>


                    <div className="overflow-hidden m-3 rounded-2xl text-white bg-indigo-900 mb-5 py-3 px-2 items-center justify-center">

                        <div className='flex justify-evenly gap-5 items-center'>
                            <div className=" h-12 w-12">
                                <img className='mask mask-squircle h-12 w-12'
                                    src={importedItem.product_image}
                                    alt="Avatar Tailwind CSS Component" />
                            </div>

                            <div><div className="font-bold lg:text-xl md:text-xl text-xs"><h2>{importedItem.product_name}</h2></div>
                                <div className="text-sm opacity-50"><p>Origin: {importedItem.product_origin}</p></div>
                            </div>

                            <div><h2 className='lg:text-xl md:text-xl text-[10px]'>Quantity: {importedItem.import_quantity}</h2></div>

                            <div><p className='lg:text-xl md:text-xl text-[10px]'>Price: {importedItem.product_price}</p></div>


                            <div> <h2 className='lg:text-xl md:text-xl text-[10px]'>Rating: {importedItem.product_rating}</h2></div>

                            <div><button onClick={() => handleImportDelete(importedItem._id)} className='text-2xl cursor-pointer' >❌</button></div>
                        </div>





                    </div>
                </div>)))}

        </div>


    )
};

export default MyImports;