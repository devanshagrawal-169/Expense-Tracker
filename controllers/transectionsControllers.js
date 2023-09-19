const transectionModel =require('../models/transectionModel');
const moment= require('moment');
const getallTransection=async(req,res)=>{
    try {
        const {freq,type}=req.body
        const transections= await transectionModel.find({
            date:{
                $gt:moment().subtract(Number(freq),'d').toDate(),
            },
            userid:req.body.userid,
            ...(type!=='all'&& {type})
        });
        res.status(200).json(transections);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const addTransection=async (req,res)=>{
    try {
        const newTransection= new transectionModel(req.body);
        await newTransection.save();
        res.status(201).send("transection Created");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deleteTransection=async(req,res)=>{
    try {
       await transectionModel.findOneAndDelete({_id:req.body.transectionId}) ;
       res.status(200).send('Transection Deleted Successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports= {getallTransection, addTransection,deleteTransection};