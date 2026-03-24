import React from 'react';
import { renderToString } from 'react-dom/server';
import { useChat } from '@ai-sdk/react';

function Test() {
  const chat = useChat({ api: '/api/agent' });
  console.log("KEYS EXPORTED BY USECHAT:", Object.keys(chat).join(', '));
  return <div>Test</div>;
}

renderToString(<Test />);
