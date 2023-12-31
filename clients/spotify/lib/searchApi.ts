import { SpotifyApi } from '../SpotifyApi'

export class SpotifySearchApi extends SpotifyApi {
  constructor(baseUrl: string) {
    super(baseUrl, '/v1/search')
  }

  async search(accessToken: string, query: string) {
    const response = await this.apiClient.get('', {
      headers: this.buildHeaders(accessToken),
      params: {
        q: query,
        type: 'track',
        market: 'IT',
        limit: 3,
      },
    })

    return response.data
  }
}
