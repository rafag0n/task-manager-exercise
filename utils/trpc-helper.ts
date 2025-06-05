import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../server/routers/_app";

export const getTrpcServerSideHelper = () => (
  createServerSideHelpers({
    router: appRouter,
    ctx: {},
  })
);