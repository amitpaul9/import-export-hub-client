import { useContext } from "react";
import { ImportExportHubContext } from "../../../Contexts/importExportHubContext";
import Swal from "sweetalert2";


const AddExports = () => {

    const { user } = useContext(ImportExportHubContext)


    const handleAddExports = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const price = e.target.price.value;
        const origin = e.target.origin.value;
        const ratings = e.target.ratings.value;
        const quantity = e.target.quantity.value;
        const photo = e.target.photo.value;

        const newExport = {

            productName: name, productImage: photo,
            price: price, originCountry: origin, rating: ratings, availableQuantity: parseInt(quantity), createdDate: new Date(), exporter_email: user.email, exporter_name: user.displayName, exporter_image: user.photoURL
        }
        e.target.reset()


        fetch('http://localhost:3000/exports', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newExport)
        })
            .then(res => res.json())
            .then(data => {
                console.log("after saving user", data);
                Swal.fire({
                    title: "Success!",
                    text: "Your export has been added!",
                    icon: "success"
                });
            })
    }



    return (
        <div className='flex justify-center mt-5 mb-8 flex-col text-center items-center'>
            <title>Add Exports - IE Hub</title>
            <h1 className="fieldset-legend text-2xl">Add to Export</h1>
            <form onSubmit={handleAddExports}>
                <fieldset className="fieldset bg-white border-base-300 rounded-box  lg:w-lg md:w-lg border p-4">

                    <label className="label">Product Name</label>
                    <input type="text" name='name' className="input w-full" placeholder="Your product name" />

                    <label className="label">Product Photo URL</label>
                    <input type="url" name='photo' className="input w-full" placeholder="Your product photo URL" />

                    <label className="label">Product Price</label>
                    <input type="number" name='price' className="input w-full" placeholder="Your product price" />


                    <label className="label">Origin Country</label>
                    <input type="text" name='origin' className="input w-full" placeholder="Your product origin country" />


                    <label className="label">Ratings</label>
                    <input step={0.1} min={0.1} max={5} type="number" name='ratings' className="input w-full" placeholder="Your product rating (1 to 5)" />


                    <label className="label">Available quantity</label>
                    <input type="number" name='quantity' className="input w-full" placeholder="Available quantity your product" />

                    <button className="btn text-white bg-gradient-to-r  from-gray-900 to-indigo-900  mt-4">Add Export</button>
                </fieldset>
            </form>
        </div >
    );
};

export default AddExports;