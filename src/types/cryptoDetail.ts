export interface CryptoDetailData {
    id: number;
    name: string;
    symbol: string;
    max_supply: number;
    circulating_supply: number;
    total_supply: number;
    quote: {
        USD: {
            price: number;
            percent_change_1h: number;
            percent_change_24h: number;
            percent_change_7d: number;
            market_cap: number;
        };
    };
}

export interface ChartData {
    timestamp: string;
    price: number;
}
