const db = require('../db/db')

const User = {
    getAllUser: async () => {
        const rs = await db.any('SELECT * FROM "Users"')
        return rs;
    },

    addUser: async (user) => {
        const rs = await db.one('INSERT INTO "Users"("UserID", "Username", "Password", "FullName", "Token", "Address") VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [
            user.uid,
            user.username,
            user.password,
            user.fullName,
            user.token,
            user.address
        ]);
        return rs;
    },

    addCustomer: async(cus) => {
        const rs = await db.one('INSERT INTO "Customers"("CusID", "CustomerName", "Token") VALUES($1, $2, $3) RETURNING *', [
            cus.id,
            cus.customerName,
            cus.token
        ]);
        return rs;
    },

    getUserByName: async(username) => {
        const rs = await db.oneOrNone('SELECT * FROM "Users" WHERE "Username" = $1', [username])
        return rs;
    },

    getUserByID: async(id) => {
        const rs = await db.oneOrNone('SELECT * FROM "Users" WHERE "UserID" = $1', [id])
        return rs;
    },

    getMaxID: async() => {
        const rs = await db.one('SELECT Max("UserID") FROM "Users"');
        return rs;
    }
}

module.exports = User;