const { translate } = require('@vitalets/google-translate-api');

/**
 * Translates the given text to the specified language using the Google Translate API.
 *
 * @param {string} text - The text to be translated.
 * @param {string} toLang - The language code to translate the text into.
 * @return {Promise<string>} A promise that resolves to the translated text. If an error occurs, it is logged to the console.
 */
const translateText = (text, toLang) => {
    translate(text, { to: toLang }).then(res => {
        return res.text;
    }).catch(err => {
        console.error(err);
    });
}

module.exports = { translateText }