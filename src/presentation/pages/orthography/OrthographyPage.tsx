import React, { useState } from 'react';
import {
  GptMessage,
  GptOrthographyMessage,
  MyMessage,
  TextMessageBox,
  // TextMessageBoxFile,
  // TextMessageBoxSelect,
  TypingLoader,
} from '../../components';
import { orthographyUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isMyMessage: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
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

    const data = await orthographyUseCase(message);

    if (!data.ok) {
      setMessages((messages) => [
        ...messages,
        { text: 'No se pudo realizar la correccion', isMyMessage: false },
      ]);
    } else {
      setMessages((messages) => [
        ...messages,
        {
          text: data.message,
          isMyMessage: false,
          info: {
            ...data,
          },
        },
      ]);
    }
    setIsLoading(false);

    // Añadir el mensaje de respuesta
  };

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Hello, I am GPT-3. How can I help you?' />

          {messages.map((message) => (
            <div key={message.text} className='col-span-12'>
              {message.isMyMessage ? (
                <MyMessage text={message.text} />
              ) : (
                <GptOrthographyMessage
                  errors={message.info!.errors}
                  message={message.info!.message}
                  userScore={message.info!.userScore}
                />
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

      {/* <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder='Escribe aquí lo que deseas'
      /> */}
      <TextMessageBox
        onSendMessage={handlePost}
        placeholder='Escribe aquí lo que deseas'
        disableCorrections
      />
      {/* <TextMessageBoxSelect
        onSendMessage={handlePost}
        options={[
          { id: '1', text: 'Opción 1' },
          { id: '2', text: 'Opción 2' },
          { id: '3', text: 'Opción 3' },
        ]}
      /> */}
    </div>
  );
};
