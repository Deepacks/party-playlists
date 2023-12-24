import { ApiUtils } from '@/utils'

export class SpotifySearchApi {
  private searchApiClient

  constructor(baseUrl: string) {
    this.searchApiClient = ApiUtils.createAxiosInstance(`${baseUrl}/v1/search`)
  }

  async search(query: string) {
    const response = await this.searchApiClient.get('', {
      params: {
        q: query,
      },
    })
  }
}
