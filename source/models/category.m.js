const db = require('../db/db')

const Category = {
    getAll: async ()=>{
        const rs = await db.any('SELECT * FROM "Categories"')
        return rs;
    },

    getMaxID: async ()=>{
        const rs = await db.one('SELECT MAX("CategoryID") FROM "Categories"')
        return rs;
    },

    getById: async (id) => {
        const rs = await db.one('SELECT * FROM "Categories" WHERE "CategoryID" = $1', [id])
        return rs;
    },
}

module.exports = Category;