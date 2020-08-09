const path = require('path')

// 1M
const MAX_SIZE_FILE = 1024 * 1024 * 1024;

module.exports = {
    CRYPTO_SECRET_KEY: "SUN_1992",
    MAX_SIZE_FILE,
    targetFilePath: path.join(__dirname, '../../', 'uploadFiles')
};