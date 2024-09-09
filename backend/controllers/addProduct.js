const { detectLanguage } = require("../utilities/detectLanguage.js")
const { translateText } = require("../utilities/translateText.js")
async function addProduct(req, res) {
    const { name, price, description } = req.body;
    // const nameLang = detectLanguage(name);
    // const descriptionLang = detectLanguage(description);
    // const engName = translateText(name, "eng");
    // const engDescription = translateText(description, "eng");
    // do the same for hindi and bengali

    const Product = {
        price: 29,
        en: {
            name: "Lady Finger",
            description: "Lady Finger is a popular vegetable in many parts of the world.",
        },
        hi: {
            name: "भिंडी",
            description: "भिंडी दुनिया के कई हिस्सों में एक लोकप्रिय सब्जी है।"
        },
        ba: {
            name: "ভদ্রমহিলা",
            description: "ওকড়া বিশ্বের অনেক জায়গায় একটি জনপ্রিয় সবজি।"
        }
    }
    res.status(200).json({ success: true, product: Product });
}
console.log(`Detected Language: ${detectLanguage("హలో")}`);

module.exports = { addProduct };