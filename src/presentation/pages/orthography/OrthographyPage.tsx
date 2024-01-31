import React, { useState } from 'react';
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '../../components';

interface Message {
  text: string;
  isMyMessage: boolean;
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (message: string) => {
    setIsLoading(true);
    setMessages((messages) => [
      ...messages,
      { text: message, isMyMessage: true },
    ]);

    // llamar el caso de uso

    setIsLoading(false);

    // Añadir el mensaje de respuesta
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

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder='Escribe aquí lo que deseas'
        disableCorrections
      />
    </div>
  );
};
