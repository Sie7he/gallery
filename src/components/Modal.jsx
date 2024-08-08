/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";


const Modal = ({ children }) => {

    const navigate = useNavigate();

    return (
      <div className='flex items-center relative inset-0 bg-gray-200 bg-opacity-70'>
        <button className="top-1 right-7 absolute"
            onClick={() => navigate(-1)}
        >X</button>
          <div className='p-4 mx-auto'>
            {children}
          </div>
      </div>
    )
  }
  
  export default Modal;
  