import product from "../models/Product.js";
import category from "../models/Category.js";
import mongoose from 'mongoose';

const index = async (req, res) => {
  try {
    const products = await product.find({status: 'active'});

    if (!products) {
      throw { code: 500, message: "Get products failed" };
    }
    return res.status(200).json({
      status: true,
      total: products.length,
      products,
    });
  } catch (err) {
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

const store = async (req, res) => {
  try {
    // if (!req.body.title) {
    //   throw { code: 428, message: "Masukkan title" };
    // }

    // is required 
    if(!req.body.title) { throw{code: 428, message: 'title is required'}} 
    if(!req.body.thumbnail) { throw{code: 428, message: 'thumbnail is required'}}
    if(!req.body.price) { throw{code: 428, message: 'price is required'}}
    if(!req.body.category_id) { throw{code: 428, message: 'category ID is required'}}

    //if product exist
    const productExist = await product.findOne({title: req.body.title});
    if(productExist){throw{code: 428, message: 'Product is exist'}}
    const title = req.body.title;
    const thumbnail = req.body.thumbnail;
    const price = req.body.price;
    const category_id = req.body.category_id;

      //is objectID
      if(!mongoose.Types.ObjectId.isValid(req.body.category_id)){
        throw{code: 500, message: 'Category invalid'}
      }

    //is category exist
    const categoryExist = await category.findOne({_id: req.body.category_id});
    if(!categoryExist){throw{code: 428, message: 'Category is not exist'}}

  

    const newProduct = new product({
      title: title,
      thumbnail: thumbnail,
      price: price,
      category_id: category_id
    });
    const Product = await newProduct.save();
    if (!Product) {
      throw { code: 500, message: "Store product failed" };
    }

    return res.status(200).json({
      status: true,
      Product,
    });
  } catch (err) {
    if(!err.code) {err.code = 500}
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

export { index, store };
