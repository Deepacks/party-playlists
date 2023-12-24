import { NextRequest, NextResponse } from 'next/server'
import { Redis } from 'ioredis'
import { DateTime } from 'luxon'
import { AES, format } from 'crypto-js'

import { config } from '@/config'
import { CookieData, TokenData } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const redisClient = new Redis(config.redis)

  const finalState = request.nextUrl.searchParams.get('state')!
  const initialState = await redisClient.get(finalState)

  if (!initialState) {
    return NextResponse.redirect(process.env.BASE_URL!)
  }

  await redisClient.del(finalState)

  const error = request.nextUrl.searchParams.get('error')
  if (error) {
    return NextResponse.redirect(process.env.BASE_URL!)
  }

  const code = request.nextUrl.searchParams.get('code')!

  const dto = {
    code: code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    grant_type: 'authorization_code',
  }

  const formUrlEncodedBody = Object.entries(dto)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&')

  const tokenExchangeRequest = fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID! +
            ':' +
            process.env.SPOTIFY_CLIENT_SECRET!,
        ).toString('base64'),
    },
    body: formUrlEncodedBody,
  })

  try {
    const tokenExchangeResponse = await tokenExchangeRequest

    const { access_token, refresh_token, expires_in }: TokenData =
      await tokenExchangeResponse.json()

    const cookieData: CookieData = {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiryDate: DateTime.fromJSDate(new Date())
        .plus({ seconds: expires_in })
        .toJSDate()
        .toISOString(),
    }

    const encryptedCookieData = AES.encrypt(
      JSON.stringify(cookieData),
      process.env.COOKIE_SECRET!,
    ).toString(format.Hex)

    return NextResponse.redirect(`${process.env.BASE_URL!}/home`, {
      headers: {
        'Set-Cookie': `Authorization=Bearer ${encryptedCookieData}; Path=/; Max-Age=${
          60 * 60 * 24 * 30
        }; HttpOnly`,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.redirect(process.env.BASE_URL!)
  }
}
