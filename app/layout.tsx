import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.scss'

import { AnimatedBackground } from '@/components'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] })

export const metadata: Metadata = {
  title: 'Party Playlists',
  description: 'by V',
}

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatedBackground>{children}</AnimatedBackground>
      </body>
    </html>
  )
}
