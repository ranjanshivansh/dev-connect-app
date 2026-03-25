import UserData from "@/components/UserData";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";


export default async function Page({ params }: { params: { userId: string } }) {
    const { userId } = await params; 
  return (
    <Suspense fallback={
      <div className="flex justify-center  items-center py-16">
        <Loader2Icon className="animate-spin size-6 text-gray-500"/>
      </div>
    }>
      <UserData userId={userId} />
    </Suspense>
  );
}