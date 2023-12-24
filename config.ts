export const config = {
  redis: {
    host:
      process.env.NODE_ENV === 'development'
        ? 'localhost'
        : 'party-playlists_redis',
  },
}
