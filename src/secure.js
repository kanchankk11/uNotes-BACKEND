require('dotenv').config()
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUND)

const securePassword = async (pwd) => {
    const secPass = await bcrypt.hash(pwd, saltRounds);
    return secPass;
}

module.exports = securePassword;