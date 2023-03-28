// components/Article.tsx
import React from 'react';

interface ArticleProps {
  content: string;
}

const Article: React.FC<ArticleProps> = ({ content }) => {
  return <article className="p-4">{content}</article>;
};

export default Article;
