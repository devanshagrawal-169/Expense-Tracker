import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import {Button,Modal,Box, Typography} from '@mui/material'
import { Select, Table} from 'antd'
import {DeleteOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'
import toast, { Toaster } from 'react-hot-toast';



const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [freq,setfreq]= useState('30');
  const [type,settype]=useState('all');
  const handleOpen = () => setOpen(true); 
  const handleClose = () => setOpen(false);
  const [transection, settransection]= useState({amount:"",type:"",category:"", date:"", reference:"",description:""});
  const [alltransection, setalltransection]=useState([]);
  const [total, settotal]= useState(0);
  const [income,setincome]=useState(0);
  const [expense, setexpense]=useState(0);
  const [col,setcolor]=useState("");
  const [count,setcount]=useState(0);
  const navigate= useNavigate();
  const columns =[
    {
      title:'Date',
      dataIndex:'date'
    },
    {
      title:'Amount',
      dataIndex:'amount'
    },
    {
      title:'Type',
      dataIndex:'type'
    },
    {
      title:'Category',
      dataIndex:'category'
    },{
      title:'Reference',
      dataIndex:'reference'
    },
    {
      title:'Actions',
      render:(text,record)=>(
        <Button  onClick={()=>{handleDelete(record)}}><DeleteOutlined/></Button>
      )
    },
  ];
  const getallTransections=async()=>{
    try {
      const user= JSON.parse(localStorage.getItem('user'));
      setload(true);
      const res=await axios.post("/transections/get-transection", {userid:user._id,freq,type});
      setload(false);
      setalltransection(res.data);
      // console.log(res.data);
      var tt=0;
      var inc=0;
      var ex=0;
      for(let i=0; i<res.data.length; i++){
        if(res.data[i].type==="income"){
          inc+=res.data[i].amount;
          tt+=res.data[i].amount;
        }else{
          ex+=res.data[i].amount;
          tt-=res.data[i].amount;
        }
      }
      settotal(tt);
      setincome(inc);
      setexpense(ex);
      
      if(tt>0){
        setcolor("green");
      }else{
        setcolor("red");
      }
      // console.log(total);
    } catch (error) {
      console.log(error);
      toast.error(error);
      
    }
  };
  useEffect(()=>{
    getallTransections();
  },[freq,type,count]);
  
  
  const handlechange=(e)=>{
    const { name, value } = e.target;
    settransection(prevuser => ({
        ...prevuser,
        [name]: value
    }));
  }
  const[loading,setload]=useState(false);

  const handleDelete= async(record)=>{
    try {
      setload(true);
      await axios.post("/transections/delete-transection",{transectionId:record._id});
      setload(false);
      setcount(count-1);
      toast.success('successfully Deleted');
      navigate('/')
    } catch (error) {
      setload(false);
      console.log(error);
      toast.error(error);
    }
  }


  const handleSubmit =async(e)=>{
    e.preventDefault();
    try {
      const user=JSON.parse(localStorage.getItem('user'))
      setload(true);
      await axios.post("/transections/add-transection",{...transection,userid:user._id});
      setload(false);
      setcount(count+1);
      toast.success("transection Added");
      navigate("/");
      setOpen(false);
    } catch (error) {
      setload(false);
      alert(error);
      
    }
    e.target.reset();
  }
  return (
    <Layout>
      {loading && <Loading/>}
      <div><Toaster/></div>

      <div className='filters'>
        
        <div  className='extended-filter1'> 
          <h6>Select duration </h6>
          <Select value={freq} onChange={(values)=>{
            setfreq(values);
           
          }}>
               <Select.Option value='365'>Last Year</Select.Option>
              <Select.Option value='7'>Last Week</Select.Option>
              <Select.Option value='30'>Last Month</Select.Option>
             
             
          </Select>
          <span> </span>
        </div>
        <div  className='extended-filter2'> 
          <h6>Select Type </h6>
          <Select value={type} onChange={(values)=>{
            settype(values);
           
          }}>
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
             
          </Select>
          <span> </span>
        </div>
        <div className='btnnn'>
          <Button variant="contained" onClick={handleOpen}> Add Item</Button>
        </div>
      </div>
      <div className='content'>
        <Table className="table" columns={columns} dataSource={alltransection}/>
        <div className='totalcard'>
          <span>  </span>
          <h4 style={{color:"green"}}>Total income ={income}</h4>
          <h4 style={{color:"red"}}>Total expense ={expense}</h4>
          <h4 style={{color:col}}>Total ={total}</h4>
        
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter transection detail
          </Typography>
          <form className='transectionform' onSubmit={handleSubmit}>
          <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Amount</label>
                <input type="Number" className="form-control" id="formGroupExampleInput"  name='amount' value={transection.amount} onChange={handlechange}   />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Type</label>
                <select className="form-control" name='type' value={transection.type} onChange={handlechange}>
                  <option > select one option</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>

            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">category</label>
                <select className="form-control" name='category' value={transection.category} onChange={handlechange}>
                <option > select one option</option>
                  <option value="salary">Salary</option>
                  <option value="tip">Tip</option>
                  <option value="project">Project</option>
                  <option value="food">Food</option>
                  <option value="movie">Movie</option>
                  <option value="travel">Travel</option>
                  <option value="bills">Bills</option>
                  <option value="medical">Medical</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Date</label>
                <input type="date" className="form-control" id="formGroupExampleInput"  name='date'value={transection.date} onChange={handlechange}   />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Reference</label>
                <input type="text" className="form-control" id="formGroupExampleInput"  name='reference'  value={transection.reference} onChange={handlechange} />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Description</label>
                <input type="text" className="form-control" id="formGroupExampleInput"  name='description' value={transection.description} onChange={handlechange}   />
            </div>
            <div className='d-flex justify-content-end'>
            <button type="submit" className="btn btn-primary">ADD</button>
            </div>
          </form>
        </Box>
      </Modal>
    </Layout>
    
  )
}

export default HomePage