import { Title } from "@/components/ui/Title";
import { Link } from "@/i18n/navigation";
import { Post } from "@/lib/post";
import { useTranslations } from "next-intl";


export default function Careers({ posts }: { posts: Post[] }) {
    return (
        <main className="w-screen xl:w-5xl mx-auto overflow-y-auto">
            <Title text="Careers"/>
            <Board posts={posts}/>
        </main>
    )
}

const Board = ({ posts }: { posts: Post[] }) => {
    const tBoard = useTranslations('career.board')
    
    return (
        <section className="my-12 bg-white border border-gray-200 rounded-lg shadow-sm mx-3 xl:mx-20 py-3">
            <div className="flex font-semibold py-2 mx-2 xl:mx-6 xl:text-lg border-b-[1.5px] border-gray-500">
                <span className="ml-3 mr-12 xl:ml-10 xl:mr-30 grow text-center">{tBoard('title')}</span>
                <span className="px-3 mx-3 xl:px-5 xl:mx-10">{tBoard('date')}</span>
            </div>
            <ul className="divide-y divide-gray-300"> 
                {posts.map((post) => (
                    <li key={post.id} className="mx-2 xl:mx-6 hover:text-(--brand) transition-colors duration-300">
                        <Link href={`/careers/${post.id}`}>
                            <div className="flex items-center py-2">
                                <span className="text-sm xl:text-base ml-3 mr-12 xl:ml-10 xl:mr-30 grow min-w-0 truncate flex items-center gap-1 justify-center">
                                    <span>
                                        {post.title}
                                    </span>
                                    { post.attachments &&
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                                        </svg>
                                    }
                                </span>
                                <span className="text-xs mx-3 xl:text-sm xl:mx-10">{post.date}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}