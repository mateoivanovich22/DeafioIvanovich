import React from 'react'
import {FaSearch} from "react-icons/fa"
import "./SearchBarList.css"
import { useState } from 'react'

const SearchBarList = () => {
    const [input, setInput] = useState("")

    const fetchData = ( value ) => {
        fetch()
    }
  return (
    <div className='input-wrapper'>
        <FaSearch id='search-icon' />
        <input placeholder='Type to search...' value={input} onChange={(e) => setInput(e.target.value)}/>
    </div>
  )
}

export default SearchBarList