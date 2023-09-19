import React, { useState,useEffect } from 'react'
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../components/Loading';
const Login = () => {
  const [user, setuser] = useState({ email: "", password: "" });
  const [loading, setload] = useState(false);
  const handlechange = (e) => {
    
    const { name, value } = e.target;
    setuser(prevuser => ({
      ...prevuser,
      [name]: value
    }));
  }
  const navigate = useNavigate();
  const getvalues = async (e) => {
    e.preventDefault();
    try {
        setload(true);
       const {data}= await  axios.post('/users/login', user);
       
        setload(false);
        localStorage.setItem('user',JSON.stringify({...data.user,password:''}));
        navigate('/');
        toast.success('login completed');
        
    } catch (error) {
        
        setload(true);
        // if(error.response.status===100){
        //   toast('Please Enter the detail!', {
        //     icon: '❗',
        //   });

        // }else
         if(error.response.status===404){
          toast.error("User does not exist , please register");
         
          navigate('/login');
         
        }else if(error.response.status===500){
           toast.error("Password does not match");
         

          navigate('/login');
          
        }
        else{
          toast.error(error);
        }
        setload(false);
    }

    e.target.reset();
}

useEffect(()=>{
  if(localStorage.getItem('user')){
      navigate('/');
  }
},[navigate]);
  return (
    <>
    {loading && <Loading/>}
    <div><Toaster/></div>
    <form className='loginpage' onSubmit={getvalues}>
      <h1>Login</h1>


      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' placeholder='xyz@mail.com' onChange={handlechange} />

      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handlechange} />
      </div>
      <p>Not a user ?<span><Link to='/register'>register</Link></span></p>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
    </>
  )
}

export default Login