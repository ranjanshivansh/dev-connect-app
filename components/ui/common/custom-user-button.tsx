"use client";

import { OrganizationSwitcher, UserButton, useUser } from "@clerk/nextjs";
import { BuildingIcon, ShieldIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CustomUserButton() {
  const { user } = useUser();
  const router = useRouter();

  const isAdmin =
    user?.primaryEmailAddress?.emailAddress === "ranjanshivansh08@gmail.com";

  return (
    <UserButton>

      {/* Organization (this is fine) */}
      <UserButton.UserProfilePage
        label="Organizations"
        labelIcon={<BuildingIcon className="size-4" />}
        url="organization"
      >
        <div className="p-4">
          <h2>Manage Organization</h2>
          <OrganizationSwitcher hidePersonal={true} />
        </div>
      </UserButton.UserProfilePage>

      {/* 🔥 ADD THIS INSTEAD */}
      <UserButton.MenuItems>
        {isAdmin && (
          <UserButton.Action
            label="Admin Panel"
            labelIcon={<ShieldIcon className="size-4" />}
            onClick={() => router.push("/admin")}
          />
        )}
      </UserButton.MenuItems>

    </UserButton>
  );
}