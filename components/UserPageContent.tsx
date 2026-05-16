import { use } from "react";
import UserData from "@/components/UserData";
import { unstable_noStore as noStore } from "next/cache";

export default function UserContent({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {

  noStore();

  const { userId } = use(params);

  return <UserData userId={userId} />;
}