import express from 'express';
import categories from './categories.js'
import products from './products.js'
var router = express.Router();

/* GET home page. */
router.use('/kategori', categories) 
router.use('/products', products) 

export default router;
