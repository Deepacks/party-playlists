import { FC, memo } from 'react'

interface SkeletonProps {
  isLoading: boolean
  height: number | string
  width: number | string
  children: React.ReactNode
}

export const Skeleton: FC<SkeletonProps> = memo(function Skeleton({
  isLoading,
  height,
  width,
  children,
}) {
  return isLoading ? (
    <div className="w-full flex-center">
      <div
        style={{ height, width }}
        className="bg-[#575e54] rounded-2xl animate-pulse"
      />
    </div>
  ) : (
    children
  )
})
