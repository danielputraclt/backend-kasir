import category from '../models/Category.js';

const store = async (req, res) => {
    try {
        if(!req.body.title) { throw {code: 428, message: "Masukkan title"}}
        const title = req.body.title;
        const newCategory = new category({
            title: title,
        });
        const Category = await newCategory.save();
        if(!Category) { throw { code: 500, message: "Store Category failed"}}

        return res.status(200).json({
            status: true,
            Category
        });
    } catch (err) {
        return res.status(err.code).json({
            status: false,
            message: err.message
        });
    }
   
};


export { store };