import { readdir, readFile, stat } from 'fs/promises'
import { join, relative } from 'path'

interface ExportedFile {
  path: string
  content: string
}

/**
 * Recursively collect all files from an exported site directory.
 * Returns an array of { path, content } for pushing to GitHub.
 */
export async function collectExportedFiles(dir: string): Promise<ExportedFile[]> {
  const files: ExportedFile[] = []

  async function walk(currentDir: string) {
    const entries = await readdir(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name)

      if (entry.isDirectory()) {
        await walk(fullPath)
      } else if (entry.isFile()) {
        const fileStat = await stat(fullPath)
        // Skip files larger than 5MB (binary assets should use CDN)
        if (fileStat.size > 5 * 1024 * 1024) continue

        const content = await readFile(fullPath, 'utf-8')
        const relativePath = relative(dir, fullPath)
        files.push({ path: relativePath, content })
      }
    }
  }

  await walk(dir)
  return files
}
