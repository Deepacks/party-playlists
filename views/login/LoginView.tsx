'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSpotify } from 'react-icons/fa6'
import partyPlaylistsPic from '@/public/images/party-playlists.png'

import { Button } from '@material-tailwind/react'
import { GlassCard } from '@/components'

export function LoginView() {
  const router = useRouter()

  const handleSpotifyAuth = () => {
    console.log('click')
  }

  return (
    <main className="h-full flex-center">
      <AnimatePresence>
        <motion.div
          className="w-[calc(100%-38px)] max-w-md"
          initial={{ opacity: 0, translateY: -200 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -200 }}
          transition={{ delay: 0.5 }}
        >
          <div className="mb-6 flex justify-center items-center gap-1.5">
            <div className="relative h-[100px] w-[100px]">
              <Image
                fill
                priority
                quality={100}
                draggable={false}
                placeholder="empty"
                style={{ objectFit: 'cover' }}
                src={partyPlaylistsPic}
                alt="Matrimonio"
              />
            </div>

            <div className="font-medium text-4xl leading-9">
              <h1 className="mb-1">Party</h1>
              <h1 className="ml-1">Playlists</h1>
            </div>
          </div>

          <GlassCard>
            <div className="mb-6 text-center">
              <p className="mb-1 text-2xl leading-6 font">Benvenuto!</p>
              <p className="text-lg text-gray-300">
                Accedi con Spotify per continuare.
              </p>
            </div>

            <a href="/api/auth/spotify">
              <Button
                placeholder=""
                className="w-full text-lg normal-case font-semibold rounded-full flex justify-center items-center gap-2"
                color="green"
                onClick={handleSpotifyAuth}
              >
                <FaSpotify className="w-5 h-5" />
                Accedi
              </Button>
            </a>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
