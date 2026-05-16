import { unstable_noStore as noStore } from "next/cache";
import UserData from "@/components/UserData";

export default async function UserPageContent({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {

  noStore();

  const { userId } = await params;

  return <UserData userId={userId} />;
}