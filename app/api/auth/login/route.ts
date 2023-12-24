import { NextResponse } from 'next/server'

import { SpotifyClient } from '@/clients/spotify'

export const dynamic = 'force-dynamic'

export async function GET() {
  const spotifyAuthUri = await SpotifyClient.tokenApi.generateAuthRequest()

  return NextResponse.redirect(spotifyAuthUri)
}
