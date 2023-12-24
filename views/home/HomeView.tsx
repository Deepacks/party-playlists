'use client'

import { useUserContext } from '@/hooks'

import { GlassCard } from '@/components'
import { UserGreeting } from './components/UserGreeting'
import { TrackSearch } from './components/TrackSearch'

export function HomeView() {
  useUserContext()

  return (
    <main className="h-full flex-center">
      <div className="w-[calc(100%-38px)] max-w-2xl">
        <GlassCard>
          <UserGreeting />
          <TrackSearch />
        </GlassCard>
      </div>
    </main>
  )
}
