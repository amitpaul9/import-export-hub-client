

const AddExports = () => {



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
            price: price,
            originCountry
                : origin, rating: ratings, availableQuantity: quantity, createdDate: new Date()
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
            })
    }



    return (
        <div className='flex justify-center mt-5 mb-8 flex-col text-center items-center'>
            <h1 className="fieldset-legend text-2xl">Add to Export</h1>
            <form onSubmit={handleAddExports}>
                <fieldset className="fieldset bg-white border-base-300 rounded-box w-sm md:w-lg  lg:w-lg border p-4">

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

                    <button className="btn bg-[#F4CF89] hover:transform-3d hover:bg-[#F4CF10]  mt-4">Add Export</button>
                </fieldset>
            </form>
        </div >
    );
};

export default AddExports;