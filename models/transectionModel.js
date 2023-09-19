const mongoose = require('mongoose');


const transectionSchema = new mongoose.Schema({
    userid:{
        type:String,
        required: [true, 'user is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    type:{
        type:String,
        required: [true, 'type is required']
    },
    category: {
        type: String,
        required: [true, 'category is required']
    },
    reference: {
        type: String,
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    date: {
        type: Date,
        required: [true, 'date is required']
    }
}, { timestamps: true });

const transectionModel = mongoose.model('transections', transectionSchema);

module.exports=transectionModel;