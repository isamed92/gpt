export const translateUseCase = async (prompt: string, lang: string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!resp.ok) {
      throw new Error('Error en la petición');
    }

    const data = (await resp.json()) as { message: string };

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo realizar la petición al servidor.',
    };
  }
};
