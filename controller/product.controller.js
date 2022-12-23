import { Category } from "../model/category.model.js";
import { Product } from "../model/product.model.js";
import { validationResult } from "express-validator";

export const list = (request,response,next)=>{
    Product.find().populate({path: 'categoryId'})
    .then(result=>{
       return response.render('admin/product-list.ejs',{productList: result});
    })
    .catch(err=>{
        console.log(err);
    });
}

export const saveProduct = (request, response, next) => {
    Category.find().then(result => {
        return response.render('admin/add_product.ejs', { categoryList: result, errors: [] });
    }).catch();
}

export const save = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        Category.find().then(result => {
            return response.render('admin/add_product.ejs', { categoryList: result,errors: errors.array() });
        }).catch();
    }
    else {
        request.body.productImage = request.file.filename;
        Product.create(request.body)
            .then(result => {
                return response.redirect("/product/save");
            })
            .catch(err => {
                console.log(err);
            });
    }
}