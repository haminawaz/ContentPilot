import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ContentPilot collects, uses, and protects your personal information and the inputs you submit when generating AI-assisted SEO content.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyClient />;
}
