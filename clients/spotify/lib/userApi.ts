import { Me } from '@/types'
import { ApiUtils } from '@/utils'

export class SpotifyUserApi {
  private userApiClient

  constructor(baseUrl: string) {
    this.userApiClient = ApiUtils.createAxiosInstance(`${baseUrl}/v1`)
  }

  async me(accessToken: string): Promise<Me> {
    const response = await this.userApiClient.get<Me>('/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    return response.data
  }
}
