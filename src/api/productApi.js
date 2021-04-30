const { response } = require('express');
const ProductRepository = require('../repository/productRepository');
const repository = new ProductRepository();

const ProductApi = (app) => {
    app.get('/products', (req, res) => {
        repository.loadAllProducts().then(data => res.json(data));
    });
    /*
           app.get('/products/:productName', (req, res) => {
               repository.findAllProductsByName(req.params["productName"]).then(data => res.json(data));
           });
 */
    app.get('/products/find/:price', (req, res) => {
        repository.loadProductsByPriceGt(req.params["price"]).then(data => res.json(data));
    });

    app.post('/products', (req, res) => {
        repository.saveNewProduct(req.body).then(data => res.json(data));
    });

    app.put('/products/:productId', (req, res) => {
        repository.updateExistingProduct(+req.params['productId'],
            req.body).then(data => res.json(data))
    });

    app.delete('/products/:productId', (req, res) => {
        repository.delete(req.params['productId']).then(data => res.json(data));
    });

};

module.exports = ProductApi;