import React, { useState } from 'react'
import { registerAction } from '../redux/actions/auth'
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/actions/auth'

const Auth = () => {
    const [signUp, setSignUp] = useState(true)
    const [authData, setAuthData] = useState({username:"", email:"", password:""})
    const dispatch = useDispatch();

    const onChangeFunc =(e) => {
        setAuthData({...authData, [e.target.name]: e.target.value})
        console.log(e.target.name, e.target.value);

    }

    const authFunc = () => {
        if(signUp){
            dispatch(registerAction(authData))
        }else{
            dispatch(loginAction(authData))
        }
    }
  return (
    <div className='w-full h-screen bg-gray-100 flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50 '>
        <div className='w-1/3 bg-white p-3'>
            <h1 className='text-2xl text-blue-600 font-bold'>{signUp ? "REGISTER" : "LOGIN"}</h1>
            <div className='flex flex-col space-y-3 my-5'>
                {signUp && <input value={authData.username} name="username" onChange={onChangeFunc} type="text" placeholder='Username' className='input-style'/>}
                <input value={authData.email} name="email" onChange={onChangeFunc} type="text" placeholder='Email' className='input-style'/>
                <input value={authData.password} name="password" onChange={onChangeFunc} type="text" placeholder='Password' className='input-style'/>
            </div>
            <div className='text-red-500 text-s cursor-pointer mb-3'>
                {
                    signUp ? <span onClick={()=>setSignUp(false)}>Daha önce giriş yaptnız mı?</span> : <span onClick={()=>setSignUp(true)}>Daha önce giriş yaptnız mı?</span>

 
                }
               
            </div>
            <div onClick= {authFunc} className='cursor-pointer hover:bg-blue-800 w-full p-2 text-center bg-blue-600 text-white rounded-md'> {signUp ? "Kayıt Ol" : "Giriş Yap"}</div>
        </div>
      
    </div>
  )
}

export default Auth
