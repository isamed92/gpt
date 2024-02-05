export const prosConsStreamUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
        // TODO: abort signal
      }
    );

    if (!resp.ok) {
      throw new Error('Error en la petición');
    }

    const reader = resp.body?.getReader();

    if (!reader) {
      console.error('No reader');
      return null;
    }

    return reader;
    // const decoder = new TextDecoder();

    // let text = '';

    // // eslint-disable-next-line no-constant-condition
    // while (true) {
    //   const { value, done } = await reader.read();
    //   if (done) {
    //     break;
    //   }

    //   const decodedChunk = decoder.decode(value, { stream: true });

    //   text += decodedChunk;

    //   console.log(text);
    // }
  } catch (error) {
    return null;
  }
};
