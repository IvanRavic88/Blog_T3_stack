import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import { createUserSchema } from "../../../schema/user.schema";
import { router, publicProcedure } from "../trpc";
import * as trpc from "@trpc/server";

export const userRouter = router({
  "register-user": publicProcedure
    .input(createUserSchema)

    .mutation(async ({ ctx, input }) => {
      const { name, email } = input;
      try {
        const user = await ctx.prisma.user.create({ data: { name, email } });
        return user;
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2003") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "User alredy exist",
            });
          }
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
          });
        }
      }
    }),
});
