import { Skeleton } from "@/components/ui/skeleton"

export function CryptoDetailSkeleton() {
  return (
    <div className="container p-6 space-y-6">
      {/* Title Skeleton */}
      <Skeleton className="h-10 w-[300px]" />

      {/* Chart Card Skeleton */}
      <div className="border rounded-lg p-6 mb-8 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-[80px]" />
            <Skeleton className="h-10 w-[80px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-6 w-[200px] mt-4" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <Skeleton className="h-6 w-[120px]" />
            <Skeleton className="h-8 w-[180px]" />
          </div>
        ))}
      </div>
    </div>
  )
}
