/**
 * Converts a File object to base64 string for tRPC transmission
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // Remove the data:application/pdf;base64, prefix to get just the base64 string
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = (error) => reject(error)
  })
}

/**
 * Converts File object to tRPC-compatible format
 */
export const fileToTRPCFormat = async (file: File) => {
  const base64Content = await fileToBase64(file)
  return {
    name: file.name,
    type: file.type,
    size: file.size,
    content: base64Content,
  }
}
