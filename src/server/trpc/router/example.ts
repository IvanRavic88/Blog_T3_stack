import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure.query(() => {
    return {
      greeting: `Hello form trpc server`,
    };
  }),
});
