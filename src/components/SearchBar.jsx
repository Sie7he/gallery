import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState('')
 
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/buscar/${value}`)

    }
    const handleClick = () => {
            navigate(`/`)    
        }
  

  return (
    
<nav
  className="relative flex w-full flex-wrap items-center justify-between bg-[#838a5c] py-2 text-neutral-500 shadow-lg hover:text-neutral-700   lg:py-4">
  <div className="flex w-full flex-wrap items-center justify-between px-3">
    <button
      className="ml-2 text-xl text-neutral-800 dark:text-neutral-200"
      onClick={handleClick}
      >Galería
   </button >
    
      <form className="ml-5 flex w-[49%] sm:w-[30%] items-center justify-between" onSubmit={handleSubmit}>
      <input
        type="search"
        className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-100 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary   focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Buscar"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Buscar"
        aria-describedby="button-addon2" />

     
      <button
        className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
        id="basic-addon2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd" />
        </svg>
      </button>
      </form>
   
  </div>
</nav>

  )
}
