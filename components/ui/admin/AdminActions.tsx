"use client";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  approveProductAction,
  rejectProductAction,
} from "@/lib/admin/admin-actions";
import { ProductType } from "@/types";

export default function AdminActions({
  status,
  productId,
  onApprove,
  onReject,
  isPending,
}: {
  status: string;
  productId: ProductType["id"];
  onApprove: ()=>void;
  onReject: ()=>void;
  isPending:boolean;
}) {
  const handleApprove = async () => {
    console.log("Approve");
    await approveProductAction(productId);
  };
  const handleReject = async () => {
    console.log("Reject");
    await rejectProductAction(productId);
  };
  return (
    <div className="space-y-2">
      {status === "pending" && (
        <div className="flex gap-2">
          <Button
            variant="default"
            className="hover:cursor-pointer"
            onClick={handleApprove}
            disabled={isPending}
          >
            <CheckCircleIcon className="size-4" />
            {isPending?"...":"Approve"}
          </Button>
          <Button
            variant="destructive"
            className="hover:cursor-pointer"
            onClick={handleReject}
            disabled={isPending}
          >
            <XCircleIcon className="size-4" />
           {isPending?"...":"Reject"}
          </Button>
        </div>
      )}
    </div>
  );
}