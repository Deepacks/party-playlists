import { NextRequest, NextResponse } from 'next/server'

import { ApiUtils } from '@/utils'
import { SpotifyClient } from '@/clients/spotify'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  return ApiUtils.withBearerData(
    request,
    async (bearerData) => {
      const { access_token, refresh_token, expires_in } =
        await SpotifyClient.tokenApi.refreshToken(bearerData.refreshToken)

      if (!access_token) return ApiUtils.redirectHome

      const bearerDataString = ApiUtils.createBearerDataString(
        access_token,
        refresh_token,
        expires_in,
      )

      return ApiUtils.redirectWithAuthorization(
        `${process.env.BASE_URL!}/home`,
        bearerDataString,
      )
    },
    false,
  )
}
