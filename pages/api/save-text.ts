// pages/api/save-text.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { text } = req.body;
    const fileName = generateRandomFileName();
    const filePath = path.join(process.cwd(), 'public', fileName);
    console.log('Saving file:', filePath); // Add this line

    try {
      await fs.writeFile(filePath, wrapInArticleTemplate(text));
      res.status(200).json({ url: `/${fileName}` });
    } catch (error) {
      console.error('Error:', error); // Add this line
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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <article>${content}</article>
</body>
</html>
  `;
};
