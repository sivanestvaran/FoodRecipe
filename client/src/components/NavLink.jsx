import React from 'react'
import Button from 'react-bootstrap/Button';
import { IoIosAddCircle } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { Link } from "react-router-dom";

const NavLink = () => {
  return (

    <div className='d-flex justify-content-around mt-2 pt-4 '>
        <Link to='/addRecipe'><Button variant='outline-success' size='sm'><IoIosAddCircle /> Add New</Button></Link>
        <h4 className='bold-title'>My Recipe</h4>
        <Button variant='outline-success'><IoIosHeart className='text-danger' /> Favorites</Button>
    </div>
  )
}

export default NavLink

