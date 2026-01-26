export const dynamic = 'force-static';

import { getPosts } from "@/lib/post"
import Careers from "./view"

export const metadata = {
    title: 'Careers'
}

export default function Page() {
    const posts = getPosts()
    
    return (
        <Careers posts={posts}/>
    )
}