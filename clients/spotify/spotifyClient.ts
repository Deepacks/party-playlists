import { SpotifyTokenApi, SpotifyUserApi } from './lib'

class SpotifyClientStatic {
  private accountsBaseUrl = 'https://accounts.spotify.com'
  private apiBaseUrl = 'https://api.spotify.com'

  private scope = 'user-read-private user-read-email'

  tokenApi = new SpotifyTokenApi(this.accountsBaseUrl, this.scope)
  userApi = new SpotifyUserApi(this.apiBaseUrl)
}

export const SpotifyClient = new SpotifyClientStatic()
