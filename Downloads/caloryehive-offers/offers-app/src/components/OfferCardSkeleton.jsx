export default function OfferCardSkeleton({ featured = false }) {
  return (
    <div
      className={
        featured
          ? 'grid grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-card sm:col-span-2 sm:grid-cols-2'
          : 'overflow-hidden rounded-3xl bg-white shadow-card'
      }
    >
      <div className={featured ? 'skeleton h-56 sm:h-full' : 'skeleton h-32'} />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6">
        <div className="skeleton h-3 w-20 rounded-full" />
        <div className="skeleton h-4 w-3/4 rounded-full" />
        <div className="skeleton h-3 w-full rounded-full" />
        <div className="skeleton h-3 w-2/3 rounded-full" />
        <div className="skeleton mt-2 h-9 w-full rounded-xl" />
      </div>
    </div>
  )
}
