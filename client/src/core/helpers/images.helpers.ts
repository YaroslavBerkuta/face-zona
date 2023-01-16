export const getImgOrDef = (imgUrl: string) => {
  if (imgUrl) return imgUrl
  return '/static/images/not-found.png'
}

export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
