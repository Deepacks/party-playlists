import { useCallback, useEffect } from 'react'
import { httpLocalClient } from '@/clients/httpLocalClient'
import { playbackContext, userContext } from '@/context'
import { Playback } from '@/types'

export const usePlaybackContext = () => {
  const { user } = userContext()
  const { setPlayback } = playbackContext()

  const getPlayback = useCallback(async () => {
    const response = await httpLocalClient.get<Playback>('/playback')

    setPlayback(response.data)
  }, [setPlayback])

  useEffect(() => {
    if (!user) return
    getPlayback()
  }, [getPlayback, user])
}
