import React, { Suspense } from 'react';
import { StockMarketSkeleton } from '@/components/skeletons/StockMarketSkeleton';

const StockMarketContent = () => {
    return (
        <div>
            Stock Market
        </div>
    );
};

export default function StockMarketPage() {
    return (
        <Suspense fallback={<StockMarketSkeleton />}>
            <StockMarketContent />
        </Suspense>
    );
}