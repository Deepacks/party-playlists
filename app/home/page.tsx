import { Metadata } from 'next'

import { HomeView } from '@/views'

export const metadata: Metadata = {
  title: 'Party Playlists | Home',
}

export default function HomePage() {
  return <HomeView />
}
