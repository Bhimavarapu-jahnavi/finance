curl -X POST "https://models.github.ai/inference/chat/completions" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${GITHUB_AI_KEY}" \
    -d '{
        "messages": [
            {
                "role": "system",
                "content": "You are an expert financial advisor AI. Only provide advice related to financial matters, investments, and financial legal guidance. Decline to answer non-financial questions. Always include disclaimers when appropriate. Base answers on general financial principles and avoid specific investment recommendations."
            },
            {
                "role": "user",
                "content": "What are the key factors to consider for retirement planning?"
            }
        ],
        "model": "Ministral-3B",
        "temperature": 0.7,
        "max_tokens": 2048,
        "top_p": 0.1
    }'