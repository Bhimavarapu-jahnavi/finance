'use client';
import { useEffect, useState, Suspense } from 'react';
import { CryptoData } from '@/types/crypto';
import CryptoCard from '@/components/CryptoCard';
import SearchBar from '@/components/SearchBar';
import { CryptoSkeleton } from '@/components/skeletons/CryptoSkeleton';

const CryptoContent = () => {
    const [cryptos, setCryptos] = useState<CryptoData[]>([]);
    const [filteredCryptos, setFilteredCryptos] = useState<CryptoData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await fetch('/api/crypto');
                const data = await response.json();
                setCryptos(data.data);
                setFilteredCryptos(data.data);
            } finally {
                setLoading(false);
            }
        };
        fetchCryptos();
    }, []);

    const handleSearch = (search: string) => {
        const filtered = cryptos.filter(crypto => 
            crypto.name.toLowerCase().includes(search.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCryptos(filtered);
    };

    if (loading) {
        return <CryptoSkeleton />;
    }

    return (
        <div className="p-4">
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCryptos.map((crypto) => (
                    <CryptoCard key={crypto.id} crypto={crypto} />
                ))}
            </div>
        </div>
    );
};

export default function CryptoPage() {
    return (
        <Suspense fallback={<CryptoSkeleton />}>
            <CryptoContent />
        </Suspense>
    );
}