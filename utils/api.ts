import axios from 'axios';

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export const createSummary = async (text: string): Promise<string> => {
  try {
    const response = await axios.post('/api/summarize-text', { text });
    return response.data.summary;
  } catch (error) {
    console.error('Failed to create summary', error);
    return '';
  }
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
