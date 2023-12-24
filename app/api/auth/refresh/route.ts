import { NextRequest } from 'next/server'

import { ApiUtils } from '@/utils'
import { SpotifyClient } from '@/clients'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const bearerData = ApiUtils.getBearerData(request)
  if (!bearerData) return ApiUtils.redirectHome

  const { access_token, refresh_token, expires_in } =
    await SpotifyClient.refreshToken(bearerData.refreshToken)

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
}
