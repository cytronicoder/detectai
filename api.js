require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');

// See https://gptzero.me/docs for more information
const { GPTZERO_API_KEY } = process.env;

/**
 * Uses the GPTZero API to determine if parts of a text is written by a human or AI
 * @param {string} text - The text to predict
 */
const predictText = async (text) => {
    if (!text) return 'No text provided';
    if (text.length > 20000) return 'Text too long';

    const response = await axios.post('https://api.gptzero.me/v2/predict/text', {
        document: text
    }, {
        headers: {
            'X-Api-Key': GPTZERO_API_KEY,
            'Content-Type': 'application/json'
        }
    });

    return response.data;
};

module.exports = {
    predictText
};
