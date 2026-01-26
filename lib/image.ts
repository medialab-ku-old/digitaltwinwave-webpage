import 'server-only'
import fs from 'node:fs/promises'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'

export async function getLocalBlurData(src: string) {
    const buffer = await fs.readFile(path.join(process.cwd(), 'public', src))
    const { base64 } = await getPlaiceholder(buffer)
    return base64
}