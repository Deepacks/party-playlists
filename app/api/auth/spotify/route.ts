import { RedirectType, redirect } from 'next/navigation'
import querystring from 'querystring'
import { generateState } from '@/utils'

export function GET() {
  console.log('call')

  const clientID = process.env.SPOTIFY_CLIENT_ID
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI

  const scope = 'user-read-private user-read-email'
  const state = generateState(16)

  const spotifyAuthUri =
    'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',

      client_id: clientID,
      redirect_uri: redirectUri,

      scope,
      state,
    })

  redirect(spotifyAuthUri, RedirectType.replace)
}
