import { AxiosInstance } from 'axios'

import { ApiUtils } from '@/utils'

export abstract class SpotifyApi {
  protected apiClient: AxiosInstance

  constructor(baseUrl: string, basePath: string) {
    this.apiClient = ApiUtils.createAxiosInstance(baseUrl + basePath)
  }

  protected buildHeaders(accessToken: string) {
    return { Authorization: `Bearer ${accessToken}` }
  }
}
