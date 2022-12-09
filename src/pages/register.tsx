import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import type { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function RegisterPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();

  const { mutate, error } = trpc.user["register-user"].useMutation({
    onSuccess: () => {
      router.push("/login");
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate(values);
  }
  return (
    <div className="m-auto flex h-screen max-w-xl items-center justify-center ">
      <form
        className="bg- mb-4 flex min-w-full flex-col rounded bg-white px-8 pt-6 pb-8 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && error.message}
        <h1 className="mb-5 text-2xl text-cyan-700">Register</h1>
        <input
          className="focus:shadow-outline mb-2 w-full appearance-none rounded border py-2 px-3 leading-tight text-cyan-900 shadow focus:border-orange-300 focus:outline-none"
          type="email"
          placeholder="jhone.doe@example.com"
          {...register("email")}
        ></input>
        <br />
        <input
          className="mb-4 w-full appearance-none rounded border py-2 px-3 leading-tight text-cyan-900 shadow focus:border-orange-300  focus:outline-none"
          type="text"
          placeholder="Jhone"
          {...register("name")}
        ></input>
        <div className="flex items-center text-center">
          <button
            className="focus:shadow-outline mr-5 rounded bg-cyan-700 py-2 px-4 font-bold text-white hover:bg-orange-400"
            type="submit"
          >
            Register
          </button>
          <Link
            className="inline-block  text-sm font-bold text-cyan-700 hover:text-orange-400"
            href="/login"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
