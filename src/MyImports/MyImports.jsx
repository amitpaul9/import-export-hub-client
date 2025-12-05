import React, { useContext, useEffect, useState } from 'react';
import { ImportExportHubContext } from '../../Contexts/importExportHubContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router';


const MyImports = () => {
    const { user } = useContext(ImportExportHubContext)
    const [imports, setImports] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://import-export-hub-server-lake.vercel.app/imports?email=${user.email}`)
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
                fetch(`https://import-export-hub-server-lake.vercel.app/imports/${_id}`, {
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
            <title>My Imports - IE Hub</title>
            <h2 className='text-center text-white text-2xl m-3 rounded-b-2xl bg-gradient-to-r  from-gray-900 to-indigo-900 py-4'>Your Imports</h2>

            {imports.length === 0 ? (
                <div className="text-center text-indigo-900 text-xl mt-20">
                    <p>You have no imports!</p>
                </div>
            ) : (

                imports.map(importedItem => (<div>


                    <div className="overflow-hidden m-2 lg:m-3 md:m-3 rounded-2xl lg:text-xl md:text-xl text-[8px] text-white bg-indigo-900 mb-5 py-3 px-2 items-center justify-center">

                        <div className='flex justify-evenly gap-5 items-center'>
                            <div className=" h-12 w-12">
                                <img className='mask mask-squircle h-12 w-12'
                                    src={importedItem.product_image}
                                    alt="Avatar Tailwind CSS Component" />
                            </div>

                            <div><div className="font-bold "><h2 className='lg:text-xl md:text-xl text-[10px]'>{importedItem.product_name}</h2></div>
                                <div className=" opacity-50 "><p className='lg:text-xl md:text-xl text-[10px]'>Origin: {importedItem.product_origin}</p></div>
                            </div>

                            <div><h2 className='lg:text-xl md:text-xl text-[10px]'>Quantity: {importedItem.import_quantity}</h2></div>

                            <div><p className='lg:text-xl md:text-xl text-[10px]'>Price: {importedItem.product_price}</p></div>


                            <div> <h2 className='lg:text-xl md:text-xl text-[10px]'>Rating: {importedItem.product_rating}</h2></div>
                            <div>
                                <Link to={`/products-details/${importedItem.product_id}`} className=" lg:px-5 lg:py-2 md:px-5 md:py-2  py-2 text-[10px] md:rounded-lg md:bg-gradient-to-r lg:rounded-lg lg:bg-gradient-to-r from-gray-900 to-indigo-900 ">See Details</Link>
                            </div>
                            <div><button onClick={() => handleImportDelete(importedItem._id)} className='md:text-xl lg:text-2xl text-[12px] cursor-pointer' >❌</button></div>
                        </div>





                    </div>
                </div>)))}

        </div>


    )
};

export default MyImports;