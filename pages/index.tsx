// pages/index.tsx
import React, { useState } from 'react';
import { createSummary } from '../utils/api';

export default function Home() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async () => {
    const response = await createSummary(input);
    setSummary(response);
  };

  return (
    <div className="h-screen flex flex-col">
      <textarea
        className="flex-grow resize-none p-4"
        value={input}
        onChange={handleInput}
        placeholder="Enter your text here..."
      />
      {input && (
        <button
          className="self-center mb-4 px-6 py-2 bg-blue-600 text-white rounded"
          onClick={handleSubmit}
        >
          Send
        </button>
      )}
      {summary && <div className="p-4">{summary}</div>}
    </div>
  );
}
