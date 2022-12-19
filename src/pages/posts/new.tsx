import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreatePostInput } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";

export default function CreatePostPage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<CreatePostInput>();
  const { mutate, error } = trpc.posts["create-post"].useMutation({
    onSuccess({ id }) {
      router.push(`/posts/${id}`);
    },
  });

  function onSubmit(values: CreatePostInput) {
    mutate(values);
  }
  return (
    <div className="m-auto flex h-screen max-w-xl items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 flex min-w-full flex-col rounded bg-white px-8 pt-6 pb-8 shadow-md"
      >
        {error && error.message}
        <h1 className="mb-5 text-2xl text-cyan-700">Create Post</h1>
        <input
          className="focus:shadow-outline mb-2 w-full appearance-none rounded border py-2 px-3 leading-tight text-cyan-900 shadow focus:border-orange-300 focus:outline-none"
          type="text"
          placeholder="Your post title"
          {...register("title")}
        />
        <br />
        <textarea
          className="focus:shadow-outline mb-2 w-full appearance-none rounded border py-2 px-3 leading-tight text-cyan-900 shadow focus:border-orange-300 focus:outline-none"
          placeholder="Your post title"
          {...register("body")}
        />
        <br />
        <button className="focus:shadow-outline rounded bg-cyan-700 py-2 px-4 font-bold text-white hover:bg-orange-400">
          Create post
        </button>
      </form>
    </div>
  );
}
