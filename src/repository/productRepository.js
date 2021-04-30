const models = require('../model/product');
module.exports = class ProductRepository {
    saveNewProduct(product) {
        return new models.modelInstance.products(product).saveAsync();
    }

    loadAllProducts() {
        return new Promise((resolve, reject) => {
            models.modelInstance.products.find({}, { raw: false },
                function(err, products) {
                    resolve(products);
                });
        });
    }

    loadProductsByPriceGt(productPrice) {
        const query = {
            price: { '$gt': +productPrice }
        };

        return new Promise((resolve, reject) => {
            models.modelInstance.products.find(query, { raw: true, allow_filtering: true },
                function(err, products) {
                    resolve(products);
                });
        });

    }

    delete(id) {
        const query = {
            product_id: +id
        };

        return new Promise((resolve, reject) => {
            models.modelInstance.products.delete(query,
                function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("result : " + result);
                        resolve(result);
                    }
                });
        });

    }


    updateExistingProduct(productId, product) {
        const query_object = {
            product_id: productId,
            price: +product.price,
            product_code: product.product_code,
            product_name: product.product_name
        };
        const update_values_object = {
            rating: +product.rating,
            image_url: product.image_url
        };
        return new Promise((resolve, reject) => {
            models.instance.products.update(query_object, update_values_object, function(err, data) {
                if (err) { reject(err); } else { resolve(data); }
            });
        });
    }

};