import { SpotifySearchApi, SpotifyTokenApi, SpotifyUserApi } from './lib'
import { spotifyConfig } from './config'
import { SpotifyPlayerApi } from './lib/playerApi'

class SpotifyClientStatic {
  tokenApi = new SpotifyTokenApi(
    spotifyConfig.origins.accounts,
    spotifyConfig.scope,
  )

  playerApi = new SpotifyPlayerApi(spotifyConfig.origins.api)
  searchApi = new SpotifySearchApi(spotifyConfig.origins.api)
  userApi = new SpotifyUserApi(spotifyConfig.origins.api)
}

export const SpotifyClient = new SpotifyClientStatic()
