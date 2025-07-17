import React from 'react'
import "../style.css"
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className='searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2'>
          <input type="text" placeholder='Search for products....' className='w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]' />
        <button className="!absolute top-[5px] right-[5px] z-50 w-[35px] min-w[35px] h-[35px] color-black"><FaSearch className='text-black text-[22px]'/></button>
    </div>
  )
}

export default Search
