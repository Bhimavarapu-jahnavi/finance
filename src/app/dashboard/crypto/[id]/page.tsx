"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CryptoDetailData, ChartData } from "@/types/cryptoDetail";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CryptoDetailSkeleton } from "@/components/skeletons/CryptoDetailSkeleton";

const CryptoDetailContent = () => {
  const params = useParams();
  const { id } = params;
  const [cryptoData, setCryptoData] = useState<CryptoDetailData | null>(null);
  const [timeInterval, setTimeInterval] = useState<"1H" | "24H">("1H");
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const fetchHistoricalData = async () => {
    const now = new Date();
    const dataPoints = timeInterval === "1H" ? 60 : 24; // 60 points for 1H, 24 points for 24H
    const interval = timeInterval === "1H" ? 60000 : 3600000; // 1 min or 1 hour in milliseconds

    try {
      // For 24H, fetch historical data from API
      if (timeInterval === "24H") {
        const response = await fetch(
          `/api/crypto/${id}/historical?interval=1h&limit=24`
        );
        const data = await response.json();
        if (data.prices) {
          setChartData(
            data.prices.map((p: any) => ({
              timestamp: new Date(p.timestamp).toISOString(),
              price: p.price,
            }))
          );
          return;
        }
      }

      // Fallback to simulation for 1H or if API fails
      const historicalData = [];
      const basePrice = cryptoData?.quote.USD.price || 0;

      for (let i = dataPoints - 1; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * interval);
        const timeOffset = (dataPoints - i) / dataPoints;
        const randomVariation = (Math.random() - 0.5) * 0.01 * timeOffset;
        const price = basePrice * (1 + randomVariation);

        historicalData.push({
          timestamp: timestamp.toISOString(),
          price: price,
        });
      }
      setChartData(historicalData);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  const fetchCryptoData = async () => {
    const response = await fetch(`/api/crypto/${id}`);
    const data = await response.json();
    setCryptoData(data.data[id]);
    await fetchHistoricalData();
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(
      fetchCryptoData,
      timeInterval === "1H" ? 60000 : 3600000
    );
    return () => clearInterval(interval);
  }, [id, timeInterval]);

  // Add effect specifically for interval changes
  useEffect(() => {
    if (cryptoData) {
      fetchHistoricalData();
    }
  }, [timeInterval]);

  const predictNextPrice = () => {
    if (cryptoData) {
      const currentPrice = cryptoData.quote.USD.price;
      const variation = (Math.random() - 0.5) * 0.02;
      const predictedPrice = currentPrice * (1 + variation);

      const newPrediction = {
        timestamp: new Date().toISOString(),
        price: predictedPrice,
      };
      setChartData((prev) => [...prev, newPrediction].slice(-24));
    }
  };

  const chartConfig = {
    price: {
      label: "Price USD",
      color: "hsl(210 80% 60%)",
    },
  };

  const formatTooltipDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return timeInterval === "1H"
      ? date.toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : date.toLocaleString([], {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  if (!cryptoData) return <CryptoDetailSkeleton />;

  const priceChange = cryptoData.quote.USD.percent_change_24h;
  const trendingUp = priceChange > 0;

  return (
    <div className="container p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        {cryptoData.name} ({cryptoData.symbol})
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Price History</CardTitle>
              <CardDescription>
                Real-time price updates for {cryptoData.name}
              </CardDescription>
            </div>
            <div className="flex gap-4">
              <Button onClick={predictNextPrice} variant="default">
                Predict
              </Button>
              <Button onClick={fetchCryptoData} variant="secondary">
                Refresh
              </Button>
              <Select
                value={timeInterval}
                onValueChange={(value: "1H" | "24H") => setTimeInterval(value)}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1H">1 Hour</SelectItem>
                  <SelectItem value="24H">24 Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={chartData}
              margin={{ left: 60, right: 20, top: 20, bottom: 20 }}
              height={250} // Reduced height
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return timeInterval === "1H"
                    ? date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : date.toLocaleTimeString([], { hour: "2-digit" });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  `$${value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                }
              />
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg bg-white p-2 shadow-md border">
                        <div className="text-sm font-medium text-gray-900">
                          {formatTooltipDate(payload[0].payload.timestamp)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Price: ${Number(payload[0].value).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                dataKey="price"
                type="monotone"
                fill="var(--color-price)"
                fillOpacity={0.4}
                stroke="var(--color-price)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                {trendingUp ? "Trending up" : "Trending down"} by{" "}
                {Math.abs(priceChange).toFixed(2)}% in 24h
                {trendingUp ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                Current Price: ${cryptoData.quote.USD.price.toLocaleString()}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Price</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              ${cryptoData.quote.USD.price.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              ${cryptoData.quote.USD.market_cap.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Circulating Supply</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {cryptoData.circulating_supply.toLocaleString()}{" "}
              {cryptoData.symbol}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Max Supply</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {cryptoData.max_supply
                ? cryptoData.max_supply.toLocaleString()
                : "Unlimited"}{" "}
              {cryptoData.symbol}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function CryptoDetailPage() {
  return (
    <Suspense fallback={<CryptoDetailSkeleton />}>
      <CryptoDetailContent />
    </Suspense>
  );
}
