const { predictText } = require('./api');

test('predictText', async () => {
    const result = await predictText('As an AI language model, I can create a variety of text depending on your request. Whether you need a short description, a product review, or a full-length article, I can produce a text tailored to your needs. With my language proficiency and vast knowledge on different subjects, I can write informative and engaging content that captures the interest of your target audience. From technology to business, lifestyle to education, my text can cover any topic you require. With my ability to process language patterns, I can ensure that every word I produce is accurate and grammatically sound. With my writing, you can get the results you need to achieve your goals.');
    expect(result).toEqual(expect.any(Object));
});

