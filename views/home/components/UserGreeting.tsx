import { FC, memo } from 'react'
import { userContext } from '@/context'

import { Skeleton } from '@/components'

export const UserGreeting: FC = memo(function UserGreeting() {
  const { user } = userContext()

  return (
    <div>
      <h1 className="text-center text-2xl leading-6 text-[#1CD760]">
        Benvenuto
      </h1>

      <div className="mt-2">
        <Skeleton isLoading={!user} height={30} width={'40%'}>
          <h1 className="text-center text-3xl leading-[30px] font-semibold">
            {user?.display_name}
          </h1>
        </Skeleton>
      </div>
    </div>
  )
})
