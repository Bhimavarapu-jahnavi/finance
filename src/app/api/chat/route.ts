import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message, context } = await req.json();

        const response = await fetch("https://models.github.ai/inference/chat/completions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GITHUB_AI_KEY}`
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: `You are a legal document analyzer. Analyze and respond to questions based on the following document context: ${context}`
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                model: "Mistral-3B",
                temperature: 0.7,
                max_tokens: 2048,
                top_p: 0.1
            })
        });

        const data = await response.json();
        return NextResponse.json({ response: data.choices[0].message.content });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
