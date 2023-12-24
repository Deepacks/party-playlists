import { NextResponse } from 'next/server'
import { Redis } from 'ioredis'
import querystring from 'querystring'
import { generateState } from '@/utils'

export const dynamic = 'force-dynamic'

export async function GET() {
  const redisClient = new Redis()

  const scope = 'user-read-private user-read-email'
  const state = generateState(16)

  await redisClient.set(state, 'valid')

  const spotifyAuthUri =
    'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',

      client_id: process.env.SPOTIFY_CLIENT_ID,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,

      scope,
      state,
    })

  NextResponse.redirect(spotifyAuthUri)
}
