import { create } from 'zustand'
import { Playback } from '@/types'

interface PlaybackContext {
  playback: Playback | null
  setPlayback: (playback: Playback) => void
}

export const playbackContext = create<PlaybackContext>()((set) => ({
  playback: null,
  setPlayback: (playback) => set({ playback }),
}))
