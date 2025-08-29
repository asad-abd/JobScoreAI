import { promises as fs } from "fs"
import { join } from "path"
import { tmpdir } from "os"

/**
 * Utility functions for temporary file management
 * Handles PDF storage with unique naming and cleanup
 */

/**
 * Saves uploaded file to temporary directory with unique name
 * @param file - The uploaded file
 * @param prefix - Prefix for the filename (e.g., 'cv', 'job')
 * @returns Promise<string> - Path to the saved file
 */
export const saveFileToDisk = async (file: File, prefix: string): Promise<string> => {
  const timestamp = Date.now()
  const randomId = Math.random().toString(36).substring(2, 8)
  const fileName = `${prefix}-${timestamp}-${randomId}.pdf`
  const filePath = join(tmpdir(), fileName)

  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(filePath, buffer)

  return filePath
}

/**
 * Removes temporary files from disk
 * @param filePaths - Array of file paths to remove
 */
export const removeFiles = async (filePaths: string[]): Promise<void> => {
  await Promise.allSettled(
    filePaths.map(path => 
      fs.unlink(path).catch(error => 
        console.warn(`Failed to remove temp file ${path}:`, error.message)
      )
    )
  )
}
