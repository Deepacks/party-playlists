import { SpotifyApi } from '../SpotifyApi'

export class SpotifyPlayerApi extends SpotifyApi {
  constructor(baseUrl: string) {
    super(baseUrl, '/v1/me/player')
  }

  async getPlaybackState(accessToken: string) {
    const response = await this.apiClient.get('', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    return response.data
  }
}
