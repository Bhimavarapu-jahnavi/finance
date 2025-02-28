import { Skeleton } from "@/components/ui/skeleton"

export function StockMarketSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      {/* Market Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[100px] w-full" />
        ))}
      </div>

      {/* Stock Chart Area */}
      <Skeleton className="h-[400px] w-full" />

      {/* Stock List Table */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  )
}
