const express= require('express');
const { addTransection, getallTransection,deleteTransection } = require('../controllers/transectionsControllers');
const router= express.Router();

//add transection
router.post('/add-transection',addTransection);

// get transections
router.post('/get-transection', getallTransection); 

// delete transection
router.post('/delete-transection',deleteTransection);


module.exports= router;