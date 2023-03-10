
import React,{useEffect} from 'react';
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import { loginUser } from "../features/auth/authSlice";


const Login = () => {
    useEffect(() => {
    AOS.init({duration:2000})

}, []);
  const { register, handleSubmit, reset } = useForm();
  const {user:{isLoading,email,isError,error},}=useSelector(state=>state.auth)
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const onSubmit = ({email,password}) => {
    dispatch(loginUser({email,password}))
  };

  // const handleGoogleLogin =()=>{
  //   dispatch(googleLogin())
  // }
  
useEffect(() => {
  if(!isLoading && email){
    navigate("/")

  }
}, [email,isLoading]);


useEffect(() => {
  if(isError){
   toast.error(error)

  }
}, [isError,error]);





  return (
    <div className='flex h-screen items-center'>
      <div className='w-1/2' data-aos="zoom-in" >
        <img src={loginImage} className='h-full w-full' alt='' />
      </div>
      <div className='w-1/2 grid place-items-center'  >
        <div  data-aos="zoom-in"className='bg-[#FFFAF4] rounded-lg grid place-items-center p-10'>
          <h1 className='mb-10 font-medium text-2xl'>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-3'>
              <div className='flex flex-col items-start'>
                <label htmlFor='email' className='ml-5'>
                  Email
                </label>
                <input type='email' {...register("email")} id='email' />
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='password' className='ml-5'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  {...register("password")}
                />
              </div>
              <div className='relative !mt-8'>
               
                <button
                  type='submit'
                  className='font-bold text-white py-3 rounded-full bg-primary w-full'
                >
                  Login
                </button>
              </div>
              <div>
                <p>
                  Don't have an account?{" "}
                  <span
                    className='text-primary hover:underline cursor-pointer'
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
              {/* <button
               onClick={handleGoogleLogin}
                  type='button'
                  className='font-bold text-white py-3 rounded-full bg-primary w-full'
                >
                  login with google
                </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
