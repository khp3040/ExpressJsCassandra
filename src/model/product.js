const Cassandra = require("express-cassandra");
const models = Cassandra.createClient({

    clientOptions: {
        contactPoints: ['127.0.0.1'],
        protocolOptions: { port: 9042 },
        keyspace: 'devopskeyspace',
        queryOptions: { consistency: Cassandra.consistencies.all }
    },

    ormOptions: {
        defaultReplicationStrategy: {
            class: 'SimpleStrategy',
            replication_factor: 1
        },
        dropTablesOnSchemaChange: false,
        createKeySpace: true,
        drop: false
    }

});

const ProductSchema = models.loadSchema('products', {
    fields: {
        product_id: 'int',
        product_name: 'text',
        product_code: 'text',
        price: 'double',
        image_url: 'text',
        rating: 'double'
    },
    key: [('product_id'), 'product_name', 'product_code', 'price']
});

ProductSchema.syncDB((err, result) => {
    if (err) {
        console.log("error : " + err);
    } else {
        console.log("result : " + result);
    }
});

module.exports = models;