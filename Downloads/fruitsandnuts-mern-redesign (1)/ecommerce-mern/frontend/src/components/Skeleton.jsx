export const ProductCardSkeleton = () => (
  <div className="card overflow-hidden">
    <div className="skeleton aspect-square" />
    <div className="p-4 space-y-2">
      <div className="skeleton h-3 w-1/3" />
      <div className="skeleton h-4 w-4/5" />
      <div className="skeleton h-3 w-1/2" />
      <div className="flex items-center justify-between pt-2">
        <div className="skeleton h-5 w-16" />
        <div className="skeleton h-9 w-9 rounded-full" />
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const CategorySkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="skeleton aspect-[4/5] rounded-2xl" />
    ))}
  </div>
);
