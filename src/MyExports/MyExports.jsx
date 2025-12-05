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
        <div>
            <title>My Exports - IE Hub</title>
            <h2 className='text-center text-white text-2xl m-3 rounded-b-2xl bg-gradient-to-r from-gray-900 to-indigo-900 py-4'>
                Your Exports
            </h2>

            {exports.length === 0 ? (
                <div className="text-center text-indigo-900 text-xl mt-20">
                    <p>You have no exports!</p>
                </div>
            ) : (
                exports.map((exportedItem) => (
                    <div key={exportedItem._id} className="overflow-hidden m-2 lg:m-3 md:m-3 rounded-2xl lg:text-xl md:text-xl text-[8px] bg-indigo-900 text-white p-3">
                        <div className="flex justify-evenly items-center gap-5">
                            <img className="mask mask-squircle h-12 w-12"
                                src={exportedItem.productImage}
                                alt=""
                            />

                            <div>
                                <h2 className="font-bold ">{exportedItem.productName}</h2>
                                <p className="opacity-50">Origin: {exportedItem.originCountry}</p>
                            </div>

                            <p>Available Qty: {exportedItem.availableQuantity}</p>
                            <p>Price: {exportedItem.price}</p>
                            <p>Rating: {exportedItem.rating}</p>

                            <Link
                                onClick={() => {
                                    setSelectedExport(exportedItem);
                                    handleExportModal();
                                }}
                                className="lg:px-5 lg:py-2 md:px-5 md:py-2  py-2 text-[10px] md:rounded-lg md:bg-gradient-to-r lg:rounded-lg lg:bg-gradient-to-r from-gray-900 to-indigo-900"
                            >
                                Update
                            </Link>

                            <button className="cursor-pointer md:text-xl lg:text-2xl text-[12px]" onClick={() => handleImportDelete(exportedItem._id)}>❌</button>
                        </div>
                    </div>
                ))
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
