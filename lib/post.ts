import 'server-only'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'posts')

const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

interface Attachment {
    name: string,
    src: string
}
export interface Post {
    title: string,
    date: string,
    id: string,
    attachments: string | null,
    content: string
}
export function getPosts(): Post[] {
    const fileNames = fs.readdirSync(postsDirectory)

    const posts: Post[] = fileNames.map((filename) => {
        const id = filename.replace(/\.md$/, '')

        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')

        const { data, content } = matter(fileContents)

        const date = (data.date instanceof Date) ? formatDate(data.date) : data.date

        return {
            id,
            date,
            title: data.title,
            content,
            attachments: data.attachments || null
        } as Post
    })

    return posts.sort((a, b) => {
        const dateA = Object.hasOwn(a, 'date') ? new Date(a.date) : undefined
        const dateB = Object.hasOwn(b, 'date') ? new Date(b.date) : undefined

        if (dateA === dateB) return 0
        if (dateA === undefined) return 1
        if (dateB === undefined) return -1

        return (dateA < dateB ? 1 : -1)
    })
}

export interface PostData {
    title: string,
    date: string,
    attachments: Attachment[],
    content: string
}
export async function getPostData(postId: string): Promise<PostData> {
    const filePath = path.join(postsDirectory, `${postId}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')

    const { data, content } = matter(fileContents)
    const date = data.date instanceof Date ? formatDate(data.date) : data.date

    let attachments: Attachment[] = []
    if (data.attachments) {
        const str = data.attachments as string
        if (str.trim() !== '') {
            attachments = str.split(',').map((s) => {
                const ts = s.trim()
                return {
                    name: ts,
                    src: resolveAttachmentPath(ts)
                }
            })
        }
    }

    return {
        content: resolveMarkdownImagePath(content),
        title: data.title,
        date,
        attachments
    } as PostData
}

function resolveMarkdownImagePath(content: string) {
    return content.replace(/!\[([^\]]+)\]\(([^)]+)\)/g,
        (match, alt, src) => `![${alt}](${path.join('/posts', src)})`)
}

function resolveAttachmentPath(src: string) {
    return path.join('/posts', src)
}