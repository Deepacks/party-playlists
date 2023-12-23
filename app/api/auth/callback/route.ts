import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
// import { redisClient } from '@/clients'

export async function GET(request: NextRequest) {
  // const finalState = request.nextUrl.searchParams.get('state')!
  // const initialState = await redisClient.get(finalState)

  // if (!initialState) {
  //   redirect('/')
  // }

  // await redisClient.del(finalState)

  // const error = request.nextUrl.searchParams.get('error')
  // if (error) {
  //   redirect('/')
  // }

  // const code = request.nextUrl.searchParams.get('code')

  // const requestDto = {
  //   code: code,
  //   redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  //   grant_type: 'authorization_code',
  // }

  return NextResponse.json('ok')
}
