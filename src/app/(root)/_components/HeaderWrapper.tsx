import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Header from "./Header";

export default async function HeaderWrapper() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return <Header user={user} />;
}
