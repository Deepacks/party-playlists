import { NextRequest, NextResponse } from 'next/server'

import { ApiUtils } from '@/utils'
import { SpotifyClient } from '@/clients/spotify'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  return ApiUtils.withBearerData(request, async (bearerData) => {
    const me = await SpotifyClient.userApi.me(bearerData.accessToken)

    return NextResponse.json(me)
  })
}
