import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImportExportHubContext } from '../../Contexts/importExportHubContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyExports = () => {
    const { user } = useContext(ImportExportHubContext);
    const [exports, setExport] = useState([]);
    const [selectedExport, setSelectedExport] = useState(null);
    const importModalRef = useRef(null);

    const handleExportModal = () => {
        importModalRef.current.showModal();
    };

    const handleExportUpdate = (e, _id) => {
        e.preventDefault();

        const form = e.target;
        const updatedExport = {
            productName: form.name.value,
            productImage: form.photo.value,
            price: form.price.value,
            originCountry: form.origin.value,
            rating: form.ratings.value,
            availableQuantity: form.quantity.value,
            createdDate: new Date(),
            exporter_email: user.email,
            exporter_name: user.displayName,
            exporter_image: user.photoURL,
        };

        fetch(`https://import-export-hub-server-lake.vercel.app/exports/${_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedExport)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                    setExport(exports.map(item =>
                        item._id === _id ? { ...item, ...updatedExport } : item
                    ));

                    Swal.fire("Updated!", "Product updated successfully.", "success");
                    importModalRef.current.close();
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        if (user?.email) {
            fetch(`https://import-export-hub-server-lake.vercel.app/exports?exporter_email=${user.email}`)
                .then(res => res.json())
                .then(data => setExport(data));
        }
    }, [user?.email]);

    const handleImportDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true
        }).then((res) => {
            if (res.isConfirmed) {
                fetch(`https://import-export-hub-server-lake.vercel.app/exports/${id}`, { method: "DELETE" })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            setExport(exports.filter(item => item._id !== id));
                            Swal.fire("Deleted!", "Product removed.", "success");
                        }
                    });
            }
        });
    };

    return (
        <div className="w-full px-1 md:px-4 lg:px-6">
            <title>My Exports - IE Hub</title>
            <h2 className='text-center text-white text-base md:text-xl lg:text-2xl mx-1 md:mx-3 mb-3 md:mb-4 rounded-b-2xl bg-gradient-to-r from-gray-900 to-indigo-900 py-2 md:py-3 lg:py-4'>
                Your Exports
            </h2>

            {exports.length === 0 ? (
                <div className="text-center text-indigo-900 text-base md:text-lg lg:text-xl mt-10 md:mt-20">
                    <p>You have no exports!</p>
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
                            {exports.map((exportedItem) => (
                                <tr key={exportedItem._id} className="hover:bg-gray-100 text-[10px] md:text-sm lg:text-base border-b">
                                    <td className="text-center px-1 md:px-2 lg:px-4 py-2">
                                        <div className="flex justify-center">
                                            <img className='mask mask-squircle h-8 w-8 md:h-12 md:w-12 lg:h-14 lg:w-14'
                                                src={exportedItem.productImage}
                                                alt="Product" />
                                        </div>
                                    </td>
                                    <td className="text-center px-1 md:px-2 lg:px-4">
                                        <div className="font-bold text-indigo-900 break-words">{exportedItem.productName}</div>
                                    </td>
                                    <td className="text-center px-1 md:px-2 lg:px-4 hidden md:table-cell">
                                        <span className="text-gray-600">{exportedItem.originCountry}</span>
                                    </td>
                                    <td className="text-center px-1 md:px-2 lg:px-4">
                                        <span className="font-semibold">{exportedItem.availableQuantity}</span>
                                    </td>
                                    <td className="text-center px-1 md:px-2 lg:px-4">
                                        <span className="font-semibold">${exportedItem.price}</span>
                                    </td>
                                    <td className="text-center px-1 md:px-2 lg:px-4 hidden lg:table-cell">
                                        <span className="font-semibold">{exportedItem.rating}</span>
                                    </td>
                                    <td className="text-center px-1 md:px-2 lg:px-4">
                                        <div className="flex flex-col md:flex-row gap-1 md:gap-2 items-center justify-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedExport(exportedItem);
                                                    handleExportModal();
                                                }}
                                                className="px-2 md:px-3 lg:px-4 py-1 md:py-1.5 text-[10px] md:text-xs lg:text-sm rounded-md md:rounded-lg bg-gradient-to-r from-gray-900 to-indigo-900 text-white hover:opacity-80 whitespace-nowrap"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleImportDelete(exportedItem._id)}
                                                className='text-base md:text-lg lg:text-xl cursor-pointer hover:scale-110 transition'
                                            >
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

            {/* MODAL OUTSIDE MAP */}
            <dialog ref={importModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box ">
                    <h3 className="font-bold text-center text-black">Update Product</h3>
                    <div className='flex justify-self-end'><button className='btn btn-xs  ' onClick={() => importModalRef.current.close()}>❌</button></div>

                    {selectedExport && (
                        <form onSubmit={(e) => handleExportUpdate(e, selectedExport._id)}>
                            <fieldset className="fieldset p-4 text-black ">
                                <label className="label">Product Name</label>
                                <input defaultValue={selectedExport.productName} name="name" className="input w-full" />

                                <label className="label">Photo URL</label>
                                <input defaultValue={selectedExport.productImage} name="photo" className="input w-full" />

                                <label className="label">Price</label>
                                <input defaultValue={selectedExport.price} name="price" className="input w-full" />

                                <label className="label">Origin</label>
                                <input defaultValue={selectedExport.originCountry} name="origin" className="input w-full" />

                                <label className="label">Rating</label>
                                <input defaultValue={selectedExport.rating} name="ratings" className="input w-full" />

                                <label className="label">Quantity</label>
                                <input defaultValue={selectedExport.availableQuantity} name="quantity" className="input w-full" />

                                <button className="mt-3 btn bg-indigo-900 text-white">Submit</button>

                            </fieldset>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default MyExports;