export const dynamic = 'force-static';

import { getPostData, getPosts } from "@/lib/post";
import { Metadata } from "next";
import Post from "./view";


interface Props {
    params: Promise<{ postId: string }>
}

export async function generateStaticParams() {
    const posts = getPosts()

    return posts.map((post) => ({
        postId: post.id,
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { postId } = await params
    const postData = await getPostData(postId)

    return {
        title: postData.title,
    }
}

export default async function Page({ params }: Props) {
    const { postId } = await params
    const postData = await getPostData(postId)

    return (
        <Post postData={postData} />
    )
}