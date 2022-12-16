import type { inferRouterOutputs } from "@trpc/server";
import { createContext, useContext } from "react";
import type { AppRouter } from "../server/trpc/router/_app";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type InferQueryOutput = RouterOutputs["user"]["me"];
const UserContext = createContext<InferQueryOutput>(null);

function UserContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InferQueryOutput | undefined;
}) {
  return (
    <UserContext.Provider value={value || null}>
      {children}
    </UserContext.Provider>
  );
}

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserContextProvider };
