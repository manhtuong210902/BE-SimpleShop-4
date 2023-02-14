const initOptions = {};
const pgp = require('pg-promise')(initOptions);
const cn = require('../configs/cnStr')

const db = pgp(cn)

module.exports = db