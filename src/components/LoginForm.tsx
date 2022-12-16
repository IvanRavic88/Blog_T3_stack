import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  const { data, isLoading } = trpc.user["verify-otp"].useQuery({ hash });

  if (isLoading) {
    return <p>Verifyng...</p>;
  }
  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");
  return <p>Redirecting...</p>;
}

function LoginForm() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { mutate, error } = trpc.user["request-otp"].useMutation({
    onSuccess: () => {
      setSuccess(true);
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate({ ...values, redirect: router.asPath });
  }

  const hash = router.asPath.split("#token=")[1];

  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <div className="m-auto flex h-screen max-w-xl items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg- mb-4 flex min-w-full flex-col rounded bg-white px-8 pt-6 pb-8 shadow-md"
      >
        {error && error.message}
        {success && <p>Check your email</p>}
        <h1 className="mb-5 text-2xl text-cyan-700">Login</h1>
        <input
          className="focus:shadow-outline mb-2 w-full appearance-none rounded border py-2 px-3 leading-tight text-cyan-900 shadow focus:border-orange-300 focus:outline-none"
          type="email"
          placeholder="jhone.doe@example.com"
          {...register("email")}
        ></input>
        <br />

        <div className="flex items-center text-center">
          <button
            className="focus:shadow-outline mr-5 rounded bg-cyan-700 py-2 px-4 font-bold text-white hover:bg-orange-400"
            type="submit"
          >
            Login
          </button>
          <Link
            className="inline-block  text-sm font-bold text-cyan-700 hover:text-orange-400"
            href="/register"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
