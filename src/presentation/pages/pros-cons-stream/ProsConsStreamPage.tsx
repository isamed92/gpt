import React, { useState } from 'react';
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '../../components';
import { prosConsStreamGeneratorUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isMyMessage: boolean;
}

export const ProsConsStreamPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (message: string) => {
    setIsLoading(true);
    setMessages((messages) => [
      ...messages,
      { text: message, isMyMessage: true },
    ]);

    const stream = prosConsStreamGeneratorUseCase(message);
    setIsLoading(false);
    setMessages((messages) => [...messages, { text: '', isMyMessage: false }]);

    for await (const streamText of stream) {
      setMessages((messages) => {
        const newMessages = [...messages];
        newMessages[newMessages.length - 1].text = streamText;
        return newMessages;
      });
    }
  };

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Que deseas comparar hoy?' />
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

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder='Escribe tu mensaje...'
        disableCorrections
      />
    </div>
  );
};
