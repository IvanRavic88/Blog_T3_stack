import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { UserContextProvider } from "../context/user.context";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { data, error, isLoading } = trpc.user.me.useQuery();
  if (isLoading) {
    return <>Loading user...</>;
  }

  return (
    <UserContextProvider value={data}>
      <Component {...pageProps} />
    </UserContextProvider>
  );
};

export default trpc.withTRPC(MyApp);
