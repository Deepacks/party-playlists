import { NextRequest } from 'next/server'

import { SpotifyClient } from '@/clients/spotify'
import { ApiUtils } from '@/utils'

export async function GET(request: NextRequest) {
  return ApiUtils.handleSpotifyApiMethod({
    request,
    spotifyApi: SpotifyClient.playerApi,
    method: 'getPlaybackState',
  })
}
