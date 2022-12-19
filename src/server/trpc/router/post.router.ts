import {
  createPostSchema,
  getSinglePostSchema,
} from "../../../schema/post.schema";
import { publicProcedure, router } from "../trpc";
import * as trpc from "@trpc/server";

export const postRouter = router({
  "create-post": publicProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Can not create a post while logged out",
        });
      }
      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx?.user?.id,
            },
          },
        },
      });
      return post;
    }),
  "all-posts": publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  "single-post": publicProcedure
    .input(getSinglePostSchema)
    .query(async ({ ctx, input }) => {
      return ctx.prisma.post.findUnique({
        where: { id: input.postId },
      });
    }),
});
