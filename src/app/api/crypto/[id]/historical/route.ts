import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { searchParams } = new URL(request.url);
    const interval = searchParams.get('interval') || '1h';
    const limit = parseInt(searchParams.get('limit') || '24');

    try {
        // Here you would normally fetch from your crypto data provider
        // For now, we'll generate mock historical data
        const now = Date.now();
        const basePrice = 50000; // Example base price
        const prices = Array.from({ length: limit }, (_, i) => {
            const timestamp = new Date(now - (limit - 1 - i) * 3600000);
            const randomChange = (Math.random() - 0.5) * 0.02;
            return {
                timestamp: timestamp.toISOString(),
                price: basePrice * (1 + randomChange)
            };
        });

        return NextResponse.json({ prices });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch historical data' }, { status: 500 });
    }
}
