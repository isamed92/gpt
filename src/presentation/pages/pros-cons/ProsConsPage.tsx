import React, { useState } from 'react';
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '../../components';
import { prosConsUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isMyMessage: boolean;
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (message: string) => {
    setIsLoading(true);
    setMessages((messages) => [
      ...messages,
      { text: message, isMyMessage: true },
    ]);

    const { content, ok } = await prosConsUseCase(message);
    setIsLoading(false);

    if (!ok) {
      setMessages((messages) => [
        ...messages,
        { text: 'Lo siento, no pude encontrar nada', isMyMessage: false },
      ]);
      return;
    }

    setMessages((messages) => [
      ...messages,
      { text: content, isMyMessage: false },
    ]);
  };

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Puedes escribir lo que sea que quieres que compare y te de mi punto de vista' />
          {messages.map((message) => (
            <div
              key={message.isMyMessage + message.text}
              className='col-span-12'
            >
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
