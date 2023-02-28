const axios = require("axios");
require("dotenv").config();

const huggingfaceToken = process.env.HF_TOKEN;

async function callInferenceApi(query) {
    const url = "https://api-inference.huggingface.co/models/roberta-base-openai-detector";
    const headers = { Authorization: `Bearer ${huggingfaceToken}` };

    try {
        const response = await axios.post(url, { inputs: query }, { headers });

        const fakeScore = response.data[0][0].score;
        const realScore = response.data[0][1].score;

        return [fakeScore, realScore];
    } catch (error) {
        console.error(error);
        return [0, 0];
    }
}

async function main() {
    const query = "As an AI language model, I can create a variety of text depending on your request. Whether you need a short description, a product review, or a full-length article, I can produce a text tailored to your needs. With my language proficiency and vast knowledge on different subjects, I can write informative and engaging content that captures the interest of your target audience. From technology to business, lifestyle to education, my text can cover any topic you require. With my ability to process language patterns, I can ensure that every word I produce is accurate and grammatically sound. With my writing, you can get the results you need to achieve your goals.";
    const result = await callInferenceApi(query);
    console.log(result);
}

main();
