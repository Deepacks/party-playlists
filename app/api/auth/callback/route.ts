import { NextRequest } from 'next/server'
import { Redis } from 'ioredis'

import { config } from '@/config'
import { ApiUtils } from '@/utils'
import { SpotifyClient } from '@/clients/spotify'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const redisClient = new Redis(config.redis)

  // - Get state from callback -
  const finalState = request.nextUrl.searchParams.get('state')!

  // - Search if state was created, then clear it -
  const initialState = await redisClient.get(finalState)
  if (!initialState) return ApiUtils.redirectHome

  await redisClient.del(finalState)

  // - Handle eventual errors in params -
  const error = request.nextUrl.searchParams.get('error')
  if (error) return ApiUtils.redirectHome

  // - Exchange code for token and create authorization -
  try {
    const code = request.nextUrl.searchParams.get('code')!

    const { access_token, refresh_token, expires_in } =
      await SpotifyClient.tokenApi.exchangeCode(code)

    const bearerDataString = ApiUtils.createBearerDataString(
      access_token,
      refresh_token,
      expires_in,
    )

    return ApiUtils.redirectWithAuthorization(
      `${process.env.BASE_URL!}/home`,
      bearerDataString,
    )
  } catch (error) {
    console.error(error)
    return ApiUtils.redirectHome
  }
}
