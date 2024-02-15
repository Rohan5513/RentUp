import axios from "axios";
import { useState } from "react";

export default function PostProperty() {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get the form data
        const formData = new FormData(event.target);

        // Ensure at least 3 images are selected
        // if (selectedImages.length < 3) {
        //     alert('Please select at least 3 images.');
        //     setSelectedImages([]);
        //     return;
        // }
        
        if (selectedImages.length > 5) {
            alert('You can upload at most 5 images.');
            setSelectedImages([]);
            return;
        }

        // Collect form data into the 'property' object
        const property = {
            propertyType: formData.get('property-type'),
            bedroom: formData.get('bedroom'),
            bathroom: formData.get('bathroom'),
            surface: formData.get('surface'),
            address: formData.get('address'),
            rent: formData.get('rent'),
            description: formData.get('description'),
            brokerage: formData.get('brokerage'),
            images: selectedImages
        };

        console.log(property);
        try{
                await axios.post(
                  "http://localhost:8080/property/",
                  property
                )
            console.log("success");
        }
        catch(error){
            console.log(error);
        }
        // try{
        //     const property = await axios.get(
        //                   "http://localhost:8080/property/"
        //                 )
        //             console.log(property);
        //             <img src={property.data}></img>
        // }
        // catch(err){
        //     console.log(err);
        // }
    };



    const handleImageChange = (event) => {
        const files = event.target.files;
    
        // Create a preview for each selected image
        const selectedImagesArray = Array.from(files); // Convert FileList to an array
    
        Promise.all(
            selectedImagesArray.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsDataURL(file);
                });
            })
        ).then((previews) => {
            // Append new previews to the existing selectedImages array
            setSelectedImages((prevImages) => [...prevImages, ...previews]);
        });
    };



    return (
        <>
            <div className="mb-48 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-violet-900">
                        Post a Property
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex space-x-2">
                            <div className="w-1/2">
                                <label htmlFor="type" className="block text-l font-bold leading-6 text-violet-900 ">
                                    Select Property Type
                                </label>
                            </div>
                            <div className="border hover:border-violet-500">
                                <select  required id="property-type" name="property-type" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="">Select type</option>
                                    <option value="house">House</option>
                                    <option value="flat">Flat</option>
                                </select>
                            </div>
                            <div>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <div className="w-1/2">
                                <label htmlFor="bedroom" className="block text-l font-bold leading-6 text-violet-900">
                                    Enter Number of Bedrooms
                                </label>
                            </div>
                            <div className="w-1/2">
                                <div className="border hover:border-violet-500">
                                    <input
                                        required
                                        type="number"
                                        min="1"
                                        max="3"
                                        name="bedroom"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/2">
                                <label htmlFor="bathrooms" className="block text-l font-bold leading-6 text-violet-900">
                                    Enter Number of Bathrooms
                                </label>
                            </div>
                            <div className="w-1/2">
                                <div className="border hover:border-violet-500">
                                    <input type="number" min='1' max='3' name='bathroom' required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/2">
                                <label htmlFor="surface" className="block text-l font-bold leading-6 text-violet-900">
                                    Enter Surface Area
                                </label>
                            </div>
                            <div className="w-1/2">
                                <div className="border hover:border-violet-500">
                                    <input inputMode="numerical" min='1' name='surface' required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/2">
                                <label htmlFor="rent" className="block text-l font-bold leading-6 text-violet-900">
                                    Enter Rent/month
                                </label>
                            </div>
                            <div className="w-1/2">
                                <div className="border hover:border-violet-500">
                                    <input  min='1' name='rent' inputMode="numeric" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/2">
                                <label htmlFor="brokerage" className="block text-l font-bold leading-6 text-violet-900">
                                   Enter Brokerage
                                </label>
                            </div>
                            <div className="w-1/2">
                                <div className="border hover:border-violet-500">
                                    <input  min='1' name='brokerage' required inputMode="numeric" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <label htmlFor="Address" name='address' className="block text-lg font-bold leading-6 text-violet-900">
                                    Address
                                </label>
                            </div>
                            <div className="mt-2">
                                <textarea required
                                    className="block w-full rounded-md border resize-none hover:border-violet-500 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    name="address"
                                    rows="3"
                                    cols="40"
                                ></textarea>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <label htmlFor="Address" name='address' className="block text-lg font-bold leading-6 text-violet-900">
                                    Description
                                </label>
                            </div>
                            <div className="mt-2">
                                <textarea required
                                    className="block w-full rounded-md border resize-none hover:border-violet-500 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    name="description"
                                    rows="3"
                                    cols="40"
                                ></textarea>
                            </div>
                        </div>

                        <div className="mt-2 text-violet-900 font-bold">
                            <input
                                name="imageSection"
                                type="file"
                                id="imageSection"
                                accept="image/*"
                                // multiple
                                required
                                // onChange={handleImageChange}
                                className="block w-full rounded-md border resize-none hover:border-violet-500 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                * Select at least 3 images
                            </p>
                        </div>

                        {/* Display selected image previews */}
                        {selectedImages.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-lg font-bold text-violet-900">Selected Images:</h4>
                                <div className="flex space-x-2">
                                    {selectedImages.map((preview, index) => (
                                        <img
                                            key={index}
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-20 h-20 object-cover"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
