import React from 'react'
import profilePng from "../../images/Profile.png"
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css"
const ReviewCard = ({review}) => {
    const option = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth > 600 ? 20 : 25,
        value: review?.rating,
        isHalf: true,
      };
  return (
    <div className='reviewCard'>
    <img src={review?.userId?.avatar? review?.userId?.avatar : profilePng } alt={review.userId.name} />
    <p>{review?.userId?.name}</p>
    <div className="RatingStar">
    <ReactStars {...option}  />
        
    </div>
    <span className="reviewCardComment">{review?.comment}</span>

    </div>
  )
}

export default ReviewCard
