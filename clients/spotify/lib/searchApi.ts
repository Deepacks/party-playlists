import { ApiUtils } from '@/utils'

export class SpotifySearchApi {
  private searchApiClient

  constructor(baseUrl: string) {
    this.searchApiClient = ApiUtils.createAxiosInstance(`${baseUrl}/v1/search`)
  }

  async search(accessToken: string, query: string) {
    const response = await this.searchApiClient.get('', {
      headers: { Authorization: `Bearer ${accessToken}` },
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
