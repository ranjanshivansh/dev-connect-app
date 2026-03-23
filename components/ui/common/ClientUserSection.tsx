"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import CustomUserButton from "./custom-user-button";
import { Button } from "../button";

export default function ClientUserSection() {
  const { user } = useUser();

  if (!user) return null;
  const isAdmin =
    user.primaryEmailAddress?.emailAddress === "ranjanshivansh08@gmail.com";
  return (
    <>
      <Link href={`/user/${user.id}`}>
        <Button variant={"secondary"}>Profile</Button>
      </Link>

      {/* {isAdmin && (
        <Link href="/admin">
          <Button variant="destructive">Admin</Button>
        </Link>
      )} */}

      <CustomUserButton />
    </>
  );
}
