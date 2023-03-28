// pages/api/summarize-text.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createSummary } from '../../utils/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      const summary = await createSummary(text);
      res.status(200).json({ summary });
    } catch (error) {
      console.error('Failed to summarize text', error);
      res.status(500).json({ message: 'Failed to summarize text' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
