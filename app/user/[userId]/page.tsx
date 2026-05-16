import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
import UserPageContent from "@/components/UserPageContent";

export default function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-16">
          <Loader2Icon className="animate-spin size-6 text-gray-500" />
        </div>
      }
    >
      <UserPageContent params={params} />
    </Suspense>
  );
}