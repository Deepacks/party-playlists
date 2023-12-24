import { NextRequest, NextResponse } from 'next/server'
import { AES, enc } from 'crypto-js'

import { BearerData } from '@/types'

class ApiUtilsStatic {
  redirectHome = NextResponse.redirect(process.env.BASE_URL!)

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
    expiryDate: string,
  ): string {
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

  getBearerData(request: NextRequest): BearerData | null {
    const bearer = request.cookies.get('Authorization')?.value
    if (!bearer) return null

    const encryptedData = bearer.slice(7)

    const decryptedBearerJSON = AES.decrypt(
      encryptedData,
      process.env.COOKIE_SECRET!,
    ).toString(enc.Utf8)

    const decryptedBearer = JSON.parse(decryptedBearerJSON)

    return decryptedBearer
  }
}

export const ApiUtils = new ApiUtilsStatic()
