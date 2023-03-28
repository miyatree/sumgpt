import axios from 'axios';

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export const createSummary = async (text: string): Promise<string> => {
  const url = await saveTextToHTML(text);

  const prompt = `Please summarize the ${url}, more than 400 words.`;

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt },
    ],
  });

  return response.data.choices[0].message.content;
};


const saveTextToHTML = async (text: string): Promise<string> => {
    try {
      const response = await axios.post('/api/save-text', { text });
      return response.data.url;
    } catch (error) {
      console.error('Failed to save text to HTML', error);
      return '';
    }
  };
