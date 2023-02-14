const Product = require('../models/product.m');
const Category = require('../models/category.m');
const User = require('../models/user.m')

class productController{
    async show(req, res, next){
        const catID = req.params.catId;
        const categories = await Category.getAll();
        const user = await User.getUserByID(req.userId);
        let products = []

        if(catID == 'all'){
            products = await Product.getAll()
        }
        else{
            products = await Product.getByCatID(catID);
        }
        
        const newCategories = categories.map((ele, index) => {
            return {
                ...ele,
                id: catID
            }
        })
       
        res.render('products/show', {user, products, categories: newCategories})
    }

    async showCart(req, res, next){
        const user = await User.getUserByID(req.userId);
        res.render('products/cart', {user})
    }

    async getPro(req, res, next){
        const id = req.params.id;
        console.log(id)
        const product = await Product.getById(id);
        res.json({ product})
    }
}

module.exports = new productController();