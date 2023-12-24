import { Button } from '@material-tailwind/react'
import { FC, FormEvent, memo, useCallback } from 'react'

export const TrackSearch: FC = memo(function TrackSearch() {
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }, [])

  return (
    <form className="mt-6 flex gap-6" onSubmit={handleSubmit}>
      <input type="text" />
      <Button
        placeholder=""
        className="text-lg normal-case font-semibold rounded-full flex justify-center items-center gap-2"
        color="green"
      >
        Cerca
      </Button>
    </form>
  )
})
