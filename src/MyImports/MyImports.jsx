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


        <div className="w-full px-1 md:px-4 lg:px-6">
            <title>My Imports - IE Hub</title>
            <h2 className='text-center text-white text-base md:text-xl lg:text-2xl mx-1 md:mx-3 mb-3 md:mb-4 rounded-b-2xl bg-gradient-to-r from-gray-900 to-indigo-900 py-2 md:py-3 lg:py-4'>Your Imports</h2>

            {imports.length === 0 ? (
                <div className="text-center text-indigo-900 text-base md:text-lg lg:text-xl mt-10 md:mt-20">
                    <p>You have no imports!</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="table w-full min-w-max">
                        <thead>
                            <tr className="bg-indigo-900 text-white text-[10px] md:text-sm lg:text-base">
                                <th className="text-center px-1 md:px-2 lg:px-4">Image</th>
                                <th className="text-center px-1 md:px-2 lg:px-4">Name</th>
                                <th className="text-center px-1 md:px-2 lg:px-4 hidden md:table-cell">Origin</th>
                                <th className="text-center px-1 md:px-2 lg:px-4">Qty</th>
                                <th className="text-center px-1 md:px-2 lg:px-4">Price</th>
                                <th className="text-center px-1 md:px-2 lg:px-4 hidden lg:table-cell">Rating</th>
                                <th className="text-center px-1 md:px-2 lg:px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {imports.map(importedItem => (
                                <tr key={importedItem._id} className="hover:bg-gray-100 text-[10px] md:text-sm lg:text-base border-b">
                                    <td className="text-center px-1 md:px-2 lg:px-4 py-2">
                                        <div className="flex justify-center">
                                            <img className='mask mask-squircle h-8 w-8 md:h-12 md:w-12 lg:h-14 lg:w-14'
                                                src={importedItem.product_image}
                                                alt="Product" />
                                        </div>
                                    </td>
                                    <td className="text-center px-1 md:px-2 lg:px-4">
                                        <div className="font-bold text-indigo-900 break-words">{importedItem.product_name}</div>
                                    </td>
                                    <td className="text-center px-1 md:px-2 lg:px-4 hidden md:table-cell">
                                        <span className="text-gray-600">{importedItem.product_origin}</span>
                                    </td>
                                    <td className="text-center px-1 md:px-2 lg:px-4">
                                        <span className="font-semibold">{importedItem.import_quantity}</span>
                                    </td>
                                    <td className="text-center px-1 md:px-2 lg:px-4">
                                        <span className="font-semibold">${importedItem.product_price}</span>
                                    </td>
                                    <td className="text-center px-1 md:px-2 lg:px-4 hidden lg:table-cell">
                                        <span className="font-semibold">{importedItem.product_rating}</span>
                                    </td>
                                    <td className="text-center px-1 md:px-2 lg:px-4">
                                        <div className="flex flex-col md:flex-row gap-1 md:gap-2 items-center justify-center">
                                            <Link to={`/products-details/${importedItem.product_id}`}
                                                className="px-2 md:px-3 lg:px-4 py-1 md:py-1.5 text-[10px] md:text-xs lg:text-sm rounded-md md:rounded-lg bg-gradient-to-r from-gray-900 to-indigo-900 text-white hover:opacity-80 whitespace-nowrap">
                                                Details
                                            </Link>
                                            <button onClick={() => handleImportDelete(importedItem._id)}
                                                className='text-base md:text-lg lg:text-xl cursor-pointer hover:scale-110 transition'>
                                                ❌
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>


    )
};

export default MyImports;