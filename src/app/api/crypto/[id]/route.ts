import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const response = await axios.get(
            `${process.env.CRYPTO_URL}/v1/cryptocurrency/quotes/latest?id=${params.id}`,
            {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.CRYPTO
                }
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
