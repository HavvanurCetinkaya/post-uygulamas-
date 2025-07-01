import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useDispatch } from 'react-redux';
import { deletePostAction, updatePostAction, createPostAction, getPostsAction } from '../redux/actions/post';
import { toast } from 'react-toastify';

const HomeCard = ({ post }) => {
    const dispatch = useDispatch();

    const updatePost = (post) => {
        dispatch({ type: "MODAL", payload: { open: true, updateId: post._id, postData: post } });
    }

    const deletePost = (id) => {
        dispatch(deletePostAction(id));
        toast("Silme işlemi başarıyla tamamlandı!", {
                    position: 'top-right',
                    autoClose: 5000,
                });
    }
    
  return (
    <div className='relative w-1/4 border p-4 rounded-md bg-gray-50 '>
        <div className='text-bold text-xl'>{post?.title}</div>
        <div className='text-gray-700 text-sm'>{post?.description}</div>
        <div className='flex items-center justify-between mt-4'>
            <span className='text-xs text-gray-500'>{post?.user}</span>
            <span className='text-xs text-gray-500'>{(post?.date)?.substring(0, 10)}</span>
        </div>
        <div className='absolute top-1 right-1 flex items-center space-x-3'>
            <MdDeleteOutline onClick={() => deletePost(post._id)} size={22} className='bg-red-500 rounded-full text-white p-1 cursor-pointer'  />
            <GrUpdate onClick={() => updatePost(post)} size={22} className='bg-green-600 rounded-full text-white p-1 cursor-pointer'  />
        </div>
    </div>

  )
}

export default HomeCard
