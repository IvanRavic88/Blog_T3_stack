import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function RegistarPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();

  // const { mutate, error } = trpc.user["register-user"].useMutation({
  //   onSuccess: () => {
  //     router.push("/login");
  //   },
  // });

  function onSubmit(values: CreateUserInput) {
    // mutate(values);
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* {error && error.message} */}
        <h1>Login</h1>
        <input
          type="email"
          placeholder="jhone.doe@example.com"
          {...register("email")}
        ></input>
      </form>
      <Link href="/register">Register</Link>
    </>
  );
}

export default RegistarPage;
