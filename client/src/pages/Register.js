import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const [user, setuser] = useState({ name: "", email: "", password: "" });
    const[loading,setload]=useState(false);
    const handlechange = (e) => {
        // var nname=e.target.name.value;
        // var eemail=e.target.email.value;
        // var ppass= e.target.password.value;
        const { name, value } = e.target;
        setuser(prevuser => ({
            ...prevuser,
            [name]: value
        }));


    }
    const navigate = useNavigate();
    const getdata = async (e) => {
        e.preventDefault();
        try {
            setload(true);
           await  axios.post('/users/register', user);
            toast.successS('registeration completed');
            navigate('/login');
            setload(false);
            
            
        } catch (error) {
            setload(true);
            toast.error(error);
            setload(false);
        }

        e.target.reset();
    };
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/');
        }
    },[navigate]);

    return (
        <>
        {loading && <Loading/>}
        <div><Toaster/></div>
        <form className='registerpage' onSubmit={getdata}>
            <h1>Registration </h1>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your Name" name='name' value={user.name} onChange={handlechange} />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' placeholder='xyz@mail.com' value={user.email} onChange={handlechange} />

            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={user.password} onChange={handlechange} />
            </div>
            <p>Already register ?<span><Link to='/login'>login</Link></span></p>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
        </>

    )
}

export default Register