// pages/api/serve-file.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const fileName = req.query.file as string;
    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_STORAGE_BUCKET}/${fileName}`;

    try {
      const response = await axios.get(publicUrl, { responseType: 'arraybuffer' });
      res.setHeader('Content-Type', 'text/html; charset=utf-8'); // Set the Content-Type header with charset=utf-8
      res.send(Buffer.from(response.data));
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to retrieve the file' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
