import {
  createUserSchema,
  requestOtpSchema,
} from "../../../schema/user.schema";
import { router, publicProcedure } from "../trpc";
import * as trpc from "@trpc/server";
import { sendLoginEmail } from "../../../utils/mailer";
import { baseUrl } from "../../../constants";
import { encode } from "../../../utils/base64";

export const userRouter = router({
  "register-user": publicProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      return console.log(ctx, input);
    }),
  "request-otp": publicProcedure
    .input(requestOtpSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, redirect } = input;

      const user = await ctx.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      const token = await ctx.prisma.loginToken.create({
        data: {
          redirect,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      // send email to user
      await sendLoginEmail({
        token: encode(`${token.id}:${user.email}`),
        url: baseUrl,
        email: user.email,
      });
      return true;
    }),
});
