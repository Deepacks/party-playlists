import { userContext } from '@/context'
import { FC, memo } from 'react'

export const UserGreeting: FC = memo(function UserGreeting() {
  const { user } = userContext()

  return (
    <div>
      <h1 className="text-center text-2xl text-[#1CD760]">Benvenuto</h1>
      <h1 className="mt-0.5 text-center text-3xl font-semibold">
        {user?.display_name}
      </h1>
    </div>
  )
})
