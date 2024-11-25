import React, { useState } from 'react';
import './Add.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { storage } from '../../../../firebase'; // Import Firebase storage configuration
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Add = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "pizza"
    });
    const [isUploading, setIsUploading] = useState(false);

    // const onSubmitHandler = async (event) => {
    //     event.preventDefault();

    //     if (!image) {
    //         toast.error('Image not selected');
    //         return;
    //     }

    //     setIsUploading(true);

    //     // Firebase Storage logic
    //     // const storageRef = ref(storage, `food-images/${Date.now()}_${image.name}`);
    //     // const uploadTask = uploadBytesResumable(storageRef, image);

    //     uploadTask.on(
    //         "state_changed",
    //         () => {},
    //         (error) => {
    //             toast.error("Image upload failed");
    //             setIsUploading(false);
    //         },
    //         async () => {
    //             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                
    //             const formData = {
    //                 ...data,
    //                 price: Number(data.price),
    //                 image: downloadURL, // use Firebase image URL
    //             };

    //             try {
    //                 const response = await axios.post(`${url}/api/food/add`, formData);
    //                 if (response.data.success) {
    //                     toast.success(response.data.message);
    //                     setData({
    //                         name: "",
    //                         description: "",
    //                         price: "",
    //                         category: data.category
    //                     });
    //                     setImage(null);
    //                 } else {
    //                     toast.error(response.data.message);
    //                 }
    //             } catch (error) {
    //                 toast.error("Error adding food item");
    //             }

    //             setIsUploading(false);
    //         }
    //     );
    // };

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" accept="image/*" id="image" hidden />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler}>
                            <option value="Pizza">Pizza</option>
                            <option value="Breads">Breads</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Desserts">Desserts</option>

                            <option value="Add-Ons">Add-Ons</option>
                            
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' />
                    </div>
                </div>
                <button type='submit' className='add-btn' disabled={isUploading}>
                    {isUploading ? "Uploading..." : "ADD"}
                </button>
            </form>
        </div>
    );
};

export default Add;
