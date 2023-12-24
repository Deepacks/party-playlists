import { Redis } from 'ioredis'
import querystring from 'querystring'

import { config } from '@/config'
import { generateState } from '@/utils'
import { TokenData } from '@/types'

export class SpotifyTokenApi {
  private baseUrl
  private scope

  constructor(baseUrl: string, scope: string) {
    this.baseUrl = baseUrl
    this.scope = scope
  }

  private urlEncodeBody(body: { [key: string]: any }) {
    return Object.entries(body)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&')
  }

  async generateAuthRequest() {
    const redisClient = new Redis(config.redis)

    const state = generateState(16)
    await redisClient.set(state, 'valid')

    const spotifyAuthUri =
      `${this.baseUrl}/authorize?` +
      querystring.stringify({
        response_type: 'code',

        client_id: process.env.SPOTIFY_CLIENT_ID,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,

        scope: this.scope,
        state,
      })

    return spotifyAuthUri
  }

  async exchangeCode(code: string): Promise<TokenData> {
    const dto = {
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      grant_type: 'authorization_code',
    }

    const codeExchangeResponse = await fetch(`${this.baseUrl}/api/token`, {
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
      body: this.urlEncodeBody(dto),
    })

    return codeExchangeResponse.json()
  }

  async refreshToken(refreshToken: string): Promise<TokenData> {
    const dto = {
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }

    const refreshResponse = await fetch(`${this.baseUrl}/api/token`, {
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
      body: this.urlEncodeBody(dto),
    })

    return refreshResponse.json()
  }
}
