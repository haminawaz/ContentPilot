import { Suspense } from "react";
import { ProfileClient } from "@/components/dashboard/ProfileClient";

export const metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProfileClient />
    </Suspense>
  );
}
