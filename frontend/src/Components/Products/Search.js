import React, { Fragment, useState } from 'react'
import "./Search.css"
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const Navigate=useNavigate();
    const  [search,setSearch]=useState("");
    const searchSubmitHandler=(e)=>{
        e.preventDefault()
      
        console.log("searchKayword",search);
        Navigate(`/products?search=${search}`)
    }
  return (
    <Fragment>
    <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  )
}

export default Search
