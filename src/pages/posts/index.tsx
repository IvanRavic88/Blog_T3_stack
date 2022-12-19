import Link from "next/link";
import { trpc } from "../../utils/trpc";

function PostListingPage() {
  const { data, isLoading } = trpc.posts["all-posts"].useQuery();
  if (isLoading) {
    return <p>Loading....</p>;
  }
  return (
    <div>
      {data?.map((post) => {
        return (
          <article className="flex h-full flex-col p-4" key={post.id}>
            <p className="mb-2 text-2xl">{post.title}</p>
            <Link
              className="text-cyan-700 hover:text-cyan-900"
              href={`/posts/${post.id}`}
            >
              Read post
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export default PostListingPage;
