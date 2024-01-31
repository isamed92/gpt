import React from 'react';
import { GptMessage, MyMessage, TypingLoader } from '../../components';

export const OrthographyPage = () => {
  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Hello, I am GPT-3. How can I help you?' />

          <MyMessage text='I need help with orthography.' />
          <TypingLoader className='fade-in' />
        </div>
      </div>
    </div>
  );
};
