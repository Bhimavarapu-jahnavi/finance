import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    try {
        const response = await axios.get(`${process.env.CRYPTO_URL}/v1/cryptocurrency/listings/latest?start=1&limit=10`, {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.CRYPTO
            }
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}