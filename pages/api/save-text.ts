// pages/api/save-text.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { text } = req.body;
    const fileName = generateRandomFileName();
    const fileContent = wrapInArticleTemplate(text);

    try {
      const { error } = await supabase.storage
        .from(process.env.SUPABASE_STORAGE_BUCKET)
        .upload(fileName, new Blob([fileContent], { type: 'text/html;charset=utf-8' })); // Update the type here

      if (error) {
        throw error;
      }

      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_STORAGE_BUCKET}/${fileName}`;
      res.status(200).json({ url: publicUrl });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to save the file' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};


const generateRandomFileName = (): string => {
  const randomString = Math.random().toString(36).substr(2, 9);
  return `file_${randomString}.html`;
};

const wrapInArticleTemplate = (content: string): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>总结内容</title>
</head>
<body>
  <article>${content}</article>
</body>
</html>
  `;
};
