import { NextResponse } from 'next/server'

import { SpotifyClient } from '@/clients'

export const dynamic = 'force-dynamic'

export async function GET() {
  const spotifyAuthUri = await SpotifyClient.generateAuthRequest()

  return NextResponse.redirect(spotifyAuthUri)
}
