import { NextRequest } from 'next/server'

import { SpotifyClient } from '@/clients/spotify'
import { ApiUtils } from '@/utils'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  return ApiUtils.handleSpotifyApiMethod({
    request,
    spotifyApi: SpotifyClient.userApi,
    method: 'me',
  })
}
