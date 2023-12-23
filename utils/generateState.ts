const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const CHARS_LENGTH = CHARS.length

export function generateState(length: number) {
  let result = ''
  let counter = 0

  while (counter < length) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS_LENGTH))
    counter += 1
  }

  return result
}
