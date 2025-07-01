import React from 'react'
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from 'react-redux';


const Navbar = () => {
    const dispatch = useDispatch();

    const logoutFuncf = () => {
        localStorage.clear();
        window.location = '/auth';
    }

    const openModal = () => {
        dispatch({ type: "MODAL", payload: true });
    }
  return (
    <div className='h-20 bg-blue-600 flex items-center justify-between px-5'>
        <div className='text-white font-bold text-2xl cursor-pointer'>POST PAYLAŞ</div>
        <div className='flex items-center space-x-5'>
            <input type="text" placeholder='Ara' className='p-1 outline-none rounded-md'/>
            <div onClick={openModal} className='text-white text-center text-l w-40 border border-blue-900 p-1 rounded-md cursor-pointer hover:bg-blue-700'>Post Oluştur</div>
            <MdOutlineLogout onClick= {logoutFuncf} size={28} className='text-white cursor-pointer'/>
        </div>
    </div>
  )
}

export default Navbar
