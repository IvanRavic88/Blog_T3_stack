import Error from "next/error";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

function SinglePostPage() {
  const router = useRouter();
  const postId = router.query.postId as string;
  const { data, isLoading } = trpc.posts["single-post"].useQuery({ postId });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <Error statusCode={404} />;
  }
  return (
    <div className="m-auto flex h-screen flex-col items-center justify-center">
      <h1 className="mb-5 text-3xl">{data.title}</h1>
      <p className="text-xl">{data.body}</p>
    </div>
  );
}

export default SinglePostPage;
