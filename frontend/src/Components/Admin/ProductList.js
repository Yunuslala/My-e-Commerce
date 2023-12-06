import { DataGrid } from '@mui/x-data-grid'
import React, { Fragment, useEffect } from 'react'
import Loader from '../Layouts/Loader/Loader';
import SideBar from './SideBar';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AdminProducts, DeleteParticularProduct } from '../Redux/Reducers/ProductSlices/Product.slice';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
const ProductList = () => {
  const {AllProducts,loading}=useSelector((store)=>store.ProductSlice);
   const Dispatch=useDispatch();
  const navigate=useNavigate();
  const token=localStorage.getItem("meToken");
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
    Dispatch(AdminProducts({token}))
  },[])
  const deleteOrderHandler=async(id)=>{
  Dispatch(DeleteParticularProduct({token,id}));
  window.location.reload()
  }
  const rows=[];
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
          <Link to={`/admin/Update/Products/${params.row.id}`}>
            <EditIcon />
          </Link>

          <Button
            onClick={() =>
              deleteOrderHandler(params.row.id)
            }
          >
            <DeleteIcon />
          </Button>
        </Fragment>
        );
      },
    },
  ];
  AllProducts &&AllProducts.map((item)=>{
    rows.push({
      id: item._id,
      stock: item.Stock,
      price: item.price,
      name: item.name,
    });
  })
  return (
    <div className='dashBoard'>
    <SideBar />
 <Fragment >
    {loading ? (
      <Loader />
    ) : (
      <div className="productListContainer">
      <h1 id="productListHeading">All Products</h1>
        <DataGrid
         rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
        />
      </div>
    )}
    <ToastContainer />
  </Fragment>
    </div>
  )
}

export default ProductList
