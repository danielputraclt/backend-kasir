import product from "../models/Product.js";

const index = async (req, res) => {
//   try {
//     const categories = await category.find();

//     if (!categories) {
//       throw { code: 500, message: "Get categories failed" };
//     }
//     return res.status(200).json({
//       status: true,
//       total: categories.length,
//       categories,
//     });
//   } catch (err) {
//     return res.status(err.code).json({
//       status: false,
//       message: err.message,
//     });
//   }
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
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

export { index, store };
