import { NextRequest, NextResponse } from 'next/server'
import { AES, enc } from 'crypto-js'
import { DateTime } from 'luxon'
import axios from 'axios'

import { SpotifyApi } from '@/clients/spotify/SpotifyApi'
import { BearerData } from '@/types'

class ApiUtilsStatic {
  redirectHome = NextResponse.redirect(process.env.BASE_URL!)
  redirectRefresh = NextResponse.redirect(
    `${process.env.BASE_URL!}/api/auth/refresh`,
  )

  respondUnauthorized = NextResponse.json('401 Unauthorized', {
    status: 401,
    statusText: 'Unauthorized',
  })
  respondRequestRefresh = NextResponse.json('401 Token Expired', {
    status: 401,
    statusText: 'Token Expired',
  })

  createAxiosInstance(baseURL: string) {
    return axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  redirectWithAuthorization(url: string, bearerData: string) {
    return NextResponse.redirect(url, {
      headers: {
        'Set-Cookie': `Authorization=Bearer ${bearerData}; Path=/; Max-Age=${
          60 * 60 * 24 * 30
        }; HttpOnly`,
      },
    })
  }

  createBearerDataString(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
  ): string {
    const expiryDate = DateTime.fromJSDate(new Date())
      .plus({ seconds: expiresIn })
      .toJSDate()
      .toISOString()

    const bearerData: BearerData = {
      accessToken,
      refreshToken,
      expiryDate,
    }

    const encryptedBearerData = AES.encrypt(
      JSON.stringify(bearerData),
      process.env.COOKIE_SECRET!,
    ).toString()

    return encryptedBearerData
  }

  withBearerData(
    request: NextRequest,
    cb: (bearerData: BearerData) => NextResponse | Promise<NextResponse>,
    options = { isClientSide: true, isTokenRefresh: false },
  ): NextResponse | Promise<NextResponse> {
    const bearer = request.cookies.get('Authorization')?.value
    if (!bearer) {
      if (options.isClientSide) return this.respondUnauthorized
      else return this.redirectHome
    }

    const encryptedData = bearer.slice(7)

    const decryptedBearerJSON = AES.decrypt(
      encryptedData,
      process.env.COOKIE_SECRET!,
    ).toString(enc.Utf8)

    const decryptedBearer: BearerData = JSON.parse(decryptedBearerJSON)

    if (
      !options.isTokenRefresh &&
      new Date(decryptedBearer.expiryDate) <= new Date()
    ) {
      if (options.isClientSide) return this.respondRequestRefresh
      else return this.redirectRefresh
    }

    return cb(decryptedBearer)
  }

  async handleSpotifyApiMethod<T extends SpotifyApi>({
    request,
    spotifyApi,
    method,
    args = [],
  }: {
    request: NextRequest
    spotifyApi: T
    method: keyof T
    args?: (string | number)[]
  }): Promise<NextResponse> {
    return this.withBearerData(request, async (bearerData) => {
      const spotifyApiMethod = spotifyApi[method] as Function

      const spotifyApiResponse = await spotifyApiMethod.call(
        spotifyApi,
        bearerData.accessToken,
        ...args,
      )

      return NextResponse.json(spotifyApiResponse)
    })
  }
}

export const ApiUtils = new ApiUtilsStatic()
