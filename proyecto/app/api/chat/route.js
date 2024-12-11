// app/api/chat/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'No se proporcionó el prompt.' },
        { status: 400 }
      );
    }


    console.log("Clave API:", process.env.OPENAI_API_KEY);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error desde OpenAI:', data);
      return NextResponse.json(
        { error: data.error?.message || 'Error al comunicarse con OpenAI.' },
        { status: response.status }
      );
    }

    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error('Error en la ruta de API:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error en el servidor.' },
      { status: 500 }
    );
  }
}