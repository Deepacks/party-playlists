import { Redis } from 'ioredis'
import querystring from 'querystring'

import { generateState } from '@/utils'
import { config } from '@/config'
import { TokenData } from '@/types'

class SpotifyClientStatic {
  private baseUrl = 'https://accounts.spotify.com'
  private scope = 'user-read-private user-read-email'

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

    const formUrlEncodedBody = Object.entries(dto)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&')

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
      body: formUrlEncodedBody,
    })

    return codeExchangeResponse.json()
  }
}

export const SpotifyClient = new SpotifyClientStatic()
