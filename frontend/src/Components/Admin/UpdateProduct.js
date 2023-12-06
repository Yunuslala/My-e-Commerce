import React, { Fragment, useEffect, useState } from 'react'
import SideBar from './SideBar'
import { useDispatch, useSelector } from 'react-redux';
import { AddProducts, UpdateParticularProduct, getProuctDetails } from '../Redux/Reducers/ProductSlices/Product.slice';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import { Button } from '@mui/material';
import "./CreateProduct.css"
import { getAllCategory } from '../Redux/Reducers/ProductSlices/Category.slice';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateProduct.css"
const UpdateProduct = () => {
  const {loading,updateSucess,productDetails}=useSelector((state)=>state.ProductSlice);

    const [name,setName]=useState(productDetails?.name);
    const Dispatch=useDispatch();
    const [Price,setPrice]=useState(productDetails?.price);
    const [Category,setCategory]=useState(productDetails?.categoryId?._id);
    const [Description,setDescription]=useState(productDetails?.description);
    const [Stock,setStock]=useState(productDetails?.Stock);
    const [Images,setImages]=useState([]);
    const [imagesPreview,setimagesPreview]=useState([]);
    const token=localStorage.getItem("meToken");
    const {Categories}=useSelector((state)=>state.CategorySlice);
    const params=useParams();
    const navigate=useNavigate()
    useEffect(()=>{
       Dispatch(getAllCategory());
       Dispatch(getProuctDetails({id:params.id}))

    },[])
    useEffect(()=>{
      if(updateSucess==true){
        navigate('/admin/Products')
      }
    },[updateSucess])
    const createProductSubmitHandler=async(e)=>{
      e.preventDefault();
      const payload=new FormData();
     
          payload.append("name",name);
          payload.append("price",Price);
          payload.append("categoryId",Category);
          payload.append("Stock",Stock);
       

          Images.map((item)=>{
            payload.append("images",item);
          })
         
          payload.append("description",Description)
          Dispatch(UpdateParticularProduct({token,payload,id:params?.id}));
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
          <h1>Update Product</h1>

          <div>
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Product Name"
             
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <AttachMoneyIcon />
            <input
              type="number"
              placeholder="Price"
              value={Price}
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
              value={Stock}
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
            Update
          </Button>
        </form>
      </div>
    </div>
  </Fragment>
  )
}

export default UpdateProduct
