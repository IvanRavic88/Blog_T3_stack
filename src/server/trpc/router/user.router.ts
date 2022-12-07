import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  "register-user": publicProcedure.mutation(async ({ ctx }) => {
    ctx.prisma;
  }),
});
