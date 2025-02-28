import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are FinanceGuard, an AI-powered financial advisor. Your expertise is strictly limited to financial matters, including investments, personal finance, credit risk, fraud prevention, market analysis, and financial legal guidance. Do not answer any questions unrelated to finance, and politely decline non-financial queries.

Your responses must be clear, concise, and based on general financial principles. Do not provide specific investment recommendations, endorse particular assets, or offer personalized financial planning. When discussing financial strategies, include necessary disclaimers to clarify that the information is for educational purposes only and not financial advice.

Stay professional, factual, and within your financial expertise at all times. If a question is vague, request clarification while ensuring the discussion remains finance-focused.`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://models.github.ai/inference/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_AI_KEY}`
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message }
        ],
        model: "Ministral-3B",
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 0.1
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to process request:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
