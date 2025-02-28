'use client';
import { CryptoData } from '@/types/crypto';
import { useRouter } from 'next/navigation';

interface Props {
    crypto: CryptoData;
}

const CryptoCard = ({ crypto }: Props) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/dashboard/crypto/${crypto.id}`)}
            className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        >
            <h3 className="text-xl font-bold">{crypto.name}</h3>
            <p className="text-gray-600">{crypto.symbol}</p>
            <p className="text-lg">${crypto.quote.USD.price.toFixed(2)}</p>
            <p className={`${crypto.quote.USD.percent_change_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {crypto.quote.USD.percent_change_24h.toFixed(2)}%
            </p>
        </div>
    );
};

export default CryptoCard;
