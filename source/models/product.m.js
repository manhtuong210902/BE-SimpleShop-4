const db = require('../db/db')


const Product = {
    getAll: async () => {
        const rs = await db.any('SELECT * FROM "Products"')
        return rs;
    },

    getMaxID: async ()=>{
        const rs = await db.one('SELECT MAX("ProductID") FROM "Products"')
        return rs;
    },

    // add: async (product) => {
    //     const rs = await db.one('INSERT INTO "Products" VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
    //     [product.id, product.name, product.tinyDes, product.FullDes, product.price, product.catId, product.quantity]);
    //     return rs;
    // },

    getByCatID: async (Catid) => {
        const rs = await db.any('SELECT * FROM "Products" WHERE "CategoryID" = $1', [Catid])
        return rs;
    },

    // deleteById: async (id) => {
    //     const rs = await db.none('DELETE FROM "Products" WHERE "ProID" = $1', [id])
    //     return rs;
    // },

    getById: async (id) => {
        const rs = await db.one('SELECT * FROM "Products" WHERE "ProductID" = $1', [id])
        return rs;
    },

    // updateById: async (id, product) => {
    //     const rs = await db.none('UPDATE "Products" SET "ProName" = $2, "TinyDes" = $3, "Price" = $4, "CatID" = $5, "Quantity" = $6 WHERE "ProID" = $1', 
    //     [id, product.name, product.des, product.price, product.catId, product.quantity])
    //     return rs;
    // },
}

module.exports = Product;