const langdetect = require('langdetect');

const detectLanguage = (text) => {
    return langdetect.detectOne(text);
}

// console.log(`Detected Language: ${detectLanguage("హలో")}`);

module.exports = { detectLanguage }