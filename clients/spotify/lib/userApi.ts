import { SpotifyApi } from '../SpotifyApi'
import { Me } from '@/types'

export class SpotifyUserApi extends SpotifyApi {
  constructor(baseUrl: string) {
    super(baseUrl, '/v1')
  }

  async me(accessToken: string): Promise<Me> {
    const response = await this.apiClient.get<Me>('/me', {
      headers: this.buildHeaders(accessToken),
    })

    return response.data
  }
}
