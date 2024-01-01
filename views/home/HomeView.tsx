'use client'

import { usePlaybackContext, useUserContext } from '@/hooks'

import { GlassCard } from '@/components'
import { UserGreeting } from './components/UserGreeting'
import { Playback } from './components/Playback'

export function HomeView() {
  useUserContext()
  usePlaybackContext()

  return (
    <main className="h-full flex-center">
      <div className="w-[calc(100%-38px)] max-w-2xl">
        <GlassCard>
          <UserGreeting />
          <Playback />
        </GlassCard>
      </div>
    </main>
  )
}
