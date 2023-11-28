import React from 'react'
import ReactStars from "react-rating-stars-component"
import { Link } from 'react-router-dom'
const ProductCard = ({product}) => {
  console.log("objectofProduct",product);
    const option={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth>600 ? 20:25,
        value:product.ratings,
        isHalf:true
    }
  return (
   <Link className="productCard" to={`/product/${product._id}`}>
  {product.images.length && <img src={product.images[0].image} alt={product.name} />}
   <p>{product.name}</p>
   <div>
    <ReactStars {...option}/>
    <span className='productCardSpan'>{`${product.numOfReviews} reviews`}</span>
   </div>
   <span>{`₹${product.price}`}</span>
   </Link>
  )
}

export default ProductCard
