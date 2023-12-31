import { SpotifyClient } from '@/clients/spotify'
import { ApiUtils } from '@/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return ApiUtils.withBearerData(request, async (bearerData) => {
    const search = await SpotifyClient.searchApi.search(
      bearerData.accessToken,
      request.nextUrl.searchParams.get('q')!,
    )

    return NextResponse.json(search)
  })
}
