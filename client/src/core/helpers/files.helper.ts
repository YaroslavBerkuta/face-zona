export const getFileSizeInMb = (bytes: number) => Number(bytes) / 1024 / 1024

export const getFileTypeFromUrl = (filename: string) => {
  if (!filename) return null
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined
}

export function getFilenameFromUrl(url: string) {
  if (!url) return null
  return url.split('/').pop()
}
