// utils/api.ts
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Create a custom axios instance
const customAxios = axios.create();

// Remove the 'User-Agent' header from the request
customAxios.defaults.headers.common['User-Agent'] = undefined;

const saveTextToHTML = async (text: string): Promise<string> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await customAxios.post(`${baseUrl}/api/save-text`, { text });
    return response.data.url;
  } catch (error) {
    console.error('Failed to save text to HTML', error);
    return '';
  }
};

export const createSummary = async (text: string): Promise<string> => {
  const url = await saveTextToHTML(text);

  const prompt = `Please summarize the content at the page( ${url} ). The summary should be more than 400 words.`;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Failed to create summary', error);
    return '';
  }
};
