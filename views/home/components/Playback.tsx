import { FC, memo } from 'react'
import { playbackContext } from '@/context'

import { Skeleton } from '@/components'

export const Playback: FC = memo(function Playback() {
  const { playback } = playbackContext()

  return (
    <div className="mt-6 p-6 text-center bg-[#121212] border border-[#1CD76099] rounded-xl">
      <div className="text-gray-400 leading-4">Stai ascoltando:</div>

      <div className="mt-3">
        <Skeleton isLoading={!playback} height={18} width={'80%'}>
          <div className="text-lg leading-[18px]">
            {playback?.item.name} -{' '}
            {playback?.item.artists.map(
              (artist, index) => `${index ? ', ' : ''}${artist.name}`,
            )}
          </div>
        </Skeleton>
      </div>
    </div>
  )
})
