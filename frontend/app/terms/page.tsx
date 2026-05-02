import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The agreement between you and Structa when using our AI-assisted SEO content platform to generate articles, SEO metadata, links, and FAQs.",
};

export default function TermsPage() {
  return <TermsClient />;
}
