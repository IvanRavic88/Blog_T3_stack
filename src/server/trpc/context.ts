import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyJwt } from "../../utils/jwt";

import { prisma } from "../db/client";

interface CtxUser {
  id: string;
  email: string;
  name: string;
  iat: string;
  exp: number;
}

function getUserFromRequest(req: NextApiRequest) {
  const token = req.cookies.token;

  if (token) {
    try {
      const verified = verifyJwt<CtxUser>(token);
      return verified;
    } catch (error) {
      return null;
    }
  }
  return null;
}

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = { req: NextApiRequest; res: NextApiResponse };

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async ({
  req,
  res,
}: CreateContextOptions) => {
  const user = getUserFromRequest(req);
  return {
    prisma,
    req,
    res,
    user,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  return await createContextInner({ req: opts.req, res: opts.res });
};

export type Context = inferAsyncReturnType<typeof createContext>;
