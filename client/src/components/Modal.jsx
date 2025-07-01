import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction, updatePostAction } from "../redux/actions/post";
import { toast } from 'react-toastify';
import { getPostsAction } from "../redux/actions/post";

const Modal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  let auth = useSelector((state) => state.auth.auth);

  // Eğer auth yoksa localStorage'dan çek
  if (!auth) {
    try {
      auth = JSON.parse(localStorage.getItem("auth"));
    } catch (e) {
      auth = null;
    }
  }

  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (modal?.postData) {
      setPostData({ title: modal.postData.title, description: modal.postData.description });
    } else {
      setPostData({ title: "", description: "" });
    }
  }, [modal]);

  const onChangeFunc = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const postCreate = () => {
    let newPostData = { ...postData };
    if (auth && auth.username) {
      newPostData.user = auth.username;
    } else {
      toast("Kullanıcı adı bulunamadı! Lütfen tekrar giriş yapın.", { position: 'top-right', autoClose: 5000 });
      return;
    }
    if (modal?.updateId) {
      dispatch(updatePostAction(modal.updateId, newPostData));
      toast("Güncelleme işlemi başarıyla tamamlandı!", {
        position: 'top-right',
        autoClose: 5000,
      });
    } else {
      dispatch(createPostAction(newPostData));
      toast("Ekleme işlemi başarıyla tamamlandı!", {
        position: 'top-right',
        autoClose: 5000,
      });
    }
    dispatch(getPostsAction());
    dispatch({ type: "MODAL", payload: false });
  }

  return (
    <div className="w-full h-screen bg-opacity-50 bg-black fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center ">
      <div className="bg-white w-1/3 p-2 rounded-md">
        <div onClick={() => dispatch({ type: "MODAL", payload: false })} className="flex items-center justify-between cursor-pointer">
          <h1 className="font-bold text-2xl">{modal?.updateId ? "POST GÜNCELLE" : "POST PAYLAŞ"}</h1>
          <IoClose size={25}/>
        </div>
        <div className="my-4 flex flex-col space-y-3">
          <input
            value={postData.title}
            name="title"
            onChange={onChangeFunc}
            className="input-style"
            type="text"
            placeholder="Title"
          />
          <input
            value={postData.description}
            name="description"
            onChange={onChangeFunc}
            className="input-style"
            type="text"
            placeholder="Description"
          />
        </div>
        <div onClick={postCreate} className="w-full p-2 text-center bg-blue-600 text-white cursor-pointer hover:bg-blue-800">
          {modal?.updateId ? "POST GÜNCELLE" : "POST PAYLAŞ"}
        </div>
      </div>
    </div>
  );
};

export default Modal;
