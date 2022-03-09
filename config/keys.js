// KEYS.JS

if (process.env.NODE_ENV === 'production') {
    // PRODUCTIONS KEYS
    module.exports = require('./production');
} else {
    // DEV KEYS
    module.exports = require('./development');
}