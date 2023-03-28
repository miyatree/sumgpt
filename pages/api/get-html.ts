// pages/api/get-html.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const fileName = req.query.file as string;

    try {
      const { data, error } = await supabase.storage
        .from(process.env.SUPABASE_STORAGE_BUCKET)
        .download(fileName);

      if (error) {
        throw error;
      }

      res.setHeader('Content-Type', 'text/html');
      res.send(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to retrieve the file' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
