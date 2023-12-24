import { NextRequest, NextResponse } from 'next/server'
import { Redis } from 'ioredis'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const redisClient = new Redis()

  const finalState = request.nextUrl.searchParams.get('state')!
  const initialState = await redisClient.get(finalState)

  if (!initialState) {
    NextResponse.redirect('/')
  }

  await redisClient.del(finalState)

  const error = request.nextUrl.searchParams.get('error')
  if (error) {
    NextResponse.redirect('/')
  }

  const code = request.nextUrl.searchParams.get('code')

  // const requestDto = {
  //   code: code,
  //   redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  //   grant_type: 'authorization_code',
  // }

  return NextResponse.json('ok')
}
