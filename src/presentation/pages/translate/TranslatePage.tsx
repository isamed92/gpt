import React, { useState } from 'react';
import { TextMessageBoxSelect } from '../../components/chat-input-boxes/TextMessageBoxSelect';
import { GptMessage, MyMessage, TypingLoader } from '../../components';
import { translateUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isMyMessage: boolean;
}

const languages = [
  { id: 'alemán', text: 'Alemán' },
  { id: 'árabe', text: 'Árabe' },
  { id: 'bengalí', text: 'Bengalí' },
  { id: 'francés', text: 'Francés' },
  { id: 'hindi', text: 'Hindi' },
  { id: 'inglés', text: 'Inglés' },
  { id: 'japonés', text: 'Japonés' },
  { id: 'mandarín', text: 'Mandarín' },
  { id: 'portugués', text: 'Portugués' },
  { id: 'ruso', text: 'Ruso' },
];

export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (message: string, selected: string) => {
    setIsLoading(true);

    const newMessage = `Traduce al ${selected}: ${message}`;
    setMessages((messages) => [
      ...messages,
      { text: newMessage, isMyMessage: true },
    ]);

    const resp = await translateUseCase(message, selected);

    setIsLoading(false);

    setMessages((messages) => [
      ...messages,
      { text: resp.message, isMyMessage: false },
    ]);
  };

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Hello, I am GPT-3. How can I help you?' />
          {messages.map((message, index) => (
            <div key={index} className='col-span-12'>
              {message.isMyMessage ? (
                <MyMessage text={message.text} />
              ) : (
                <GptMessage text={message.text} />
              )}
            </div>
          ))}

          {isLoading ? (
            <div className='col-start-1 col-end-12 fade-in'>
              <TypingLoader />
            </div>
          ) : null}
        </div>
      </div>

      <TextMessageBoxSelect onSendMessage={handlePost} options={languages} />
    </div>
  );
};
