import React, { Fragment, useEffect, useState } from 'react'
import SideBar from './SideBar'
import { useDispatch, useSelector } from 'react-redux';
import { AddProducts } from '../Redux/Reducers/ProductSlices/Product.slice';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import { Button } from '@mui/material';
import "./CreateProduct.css"
import { getAllCategory } from '../Redux/Reducers/ProductSlices/Category.slice';
const CreateProduct = () => {
    const [name,setName]=useState("");
    const Dispatch=useDispatch();
    const [Price,setPrice]=useState();
    const [Category,setCategory]=useState("");
    const [Description,setDescription]=useState("");
    const [Stock,setStock]=useState();
    const [Images,setImages]=useState([]);
    const [imagesPreview,setimagesPreview]=useState([]);
    const token=localStorage.getItem("meToken");
    const {loading,CreateProductSucess}=useSelector((state)=>state.ProductSlice);
    const {Categories}=useSelector((state)=>state.CategorySlice)
    useEffect(()=>{
       Dispatch(getAllCategory())
    },[])
    const createProductSubmitHandler=async(e)=>{
      e.preventDefault();
      const payload=new FormData();
          payload.append("name",name);
          payload.append("price",Price);
          payload.append("categoryId",Category);
          payload.append("stock",Stock);
          Images.map((item)=>{
            payload.append("images",item);
          })
         
          payload.append("description",Description)
          Dispatch(AddProducts({token,payload}));
    }
    const createProductImagesChange=async(e)=>{
      const files = Array.from(e.target.files);

      setImages([]);
      setimagesPreview([]);
  
      files.forEach((file) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
            setimagesPreview((old) => [...old, reader.result]);
            
          }
        };
        setImages(files);
        reader.readAsDataURL(file);
      });
    }



  return (
    <Fragment>
    <div className="dashBoard">
      <SideBar />
      <div className="newProductContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
        >
          <h1>Create Product</h1>

          <div>
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <AttachMoneyIcon />
            <input
              type="number"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <DescriptionIcon />

            <textarea
              placeholder="Product Description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="1"
            ></textarea>
          </div>

          <div>
            <AccountTreeIcon />
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              {Categories && Categories.map((cate) => (
                <option value={cate?._id}>{cate?.name}</option>
              ))}
            </select>
          </div>

          <div>
            <StorageIcon />
            <input
              type="number"
              placeholder="Stock"
              required
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
            />
          </div>

          <div id="createProductFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" />
            ))}
          </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  </Fragment>
  )
}

export default CreateProduct
